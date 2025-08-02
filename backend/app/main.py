#app/main.py

from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from PIL import Image
import io
import numpy as np
from uuid import UUID

from .db import get_db, User
from facenet_pytorch import InceptionResnetV1, MTCNN
import torch
import os

#just 50 people signup/login to GARLIC-Q
USER_LIMIT = 50

#threshold for face recognition (1-0) 0.6 is better now
RECOGNITION_THRESHOLD = 0.6

# Setup FastAPI app
app = FastAPI()

#load models for each request just once
try:
    print("Loading MTCNN model...")
    mtcnn = MTCNN()
    print("MTCNN model loaded successfully")
except Exception as e:
    print(f"Error loading MTCNN model: {e}")
    mtcnn = None

try:
    print("Loading FaceNet model...")
    facenet_model = InceptionResnetV1(pretrained="vggface2").eval()
    print("FaceNet model loaded successfully")
except Exception as e:
    print(f"Error loading FaceNet model: {e}")
    facenet_model = None

def get_face_embedding(image_bytes: bytes):
    """
    detect face from image bytes, create embedding vector
    """
    try:
        # Check if facenet model is loaded
        if facenet_model is None:
            print("Error: facenet_model is not loaded")
            return None
            
        # Check if MTCNN model is loaded
        if mtcnn is None:
            print("Error: MTCNN model is not loaded")
            return None
        
        #convert bytes to PIL image
        img = Image.open(io.BytesIO(image_bytes))
        
        # Convert RGBA to RGB if necessary
        if img.mode == 'RGBA':
            print("Converting RGBA image to RGB")
            # Create a white background
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            # Paste the RGBA image onto the white background
            rgb_img.paste(img, mask=img.split()[-1])  # Use alpha channel as mask
            img = rgb_img
        elif img.mode != 'RGB':
            print(f"Converting image from {img.mode} to RGB")
            img = img.convert('RGB')

        # MTCNN detect face and crop it
        face = mtcnn(img)
        if face is None:
            print("Error: No face detected in image")
            raise ValueError("No face detected")
        
        #create 512 dimension face embedding vector with FaceNet model
        # unsqueeze(0) tensor dimension normalization
        embedding = facenet_model(face.unsqueeze(0))
        return embedding.detach().numpy().flatten()
    except Exception as e:
        #log error
        print(f"face detection error: {e}")
        return None

def cosine_similarity(embedding1, embedding2):
    """
    calculate cosine similarity between two embeddings
    """
    #np.dot() vector matrix multiplication
    #np.linalg.norm() calculate vector length
    similarity = np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))
    return float(similarity)

@app.get("/")
def read_root():
    return {"message": "Welcome to GARLIC-Q"}

@app.post("/api/v1/users/signup", status_code=status.HTTP_201_CREATED)
async def signup_user(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    signup user with face recognition, add vector to database, return user id
    """
    #control user limit
    user_count = db.query(User).count()
    if user_count >= USER_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User limit reached, {USER_LIMIT} users allowed"
        )
    
    try:
        image_bytes = await file.read()
        embedding = get_face_embedding(image_bytes)

        if embedding is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Face detection failed"
            )
        
        # embedding to list
        new_user = User(face_embedding=embedding.tolist())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"message": "User created successfully", "user_id": new_user.id}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occured while creating user: {str(e)}"
        )

@app.post("/api/v1/users/login")
async def login_user(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    login user with face recognition, return user id
    """
    try:
        image_bytes = await file.read()
        login_embedding = get_face_embedding(image_bytes)

        if login_embedding is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Face detection failed or face not found"
            )
        
        #pull all users face embeddings from database
        users = db.query(User).all()
        if not users:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No users found in database"
            )
        
        best_match_id = None
        best_similarity = 0.0

        for user in users:
            # Convert database list to numpy array for cosine similarity
            user_embedding = np.array(user.face_embedding)
            #cosine similarity between login embedding and user embedding
            similarity = cosine_similarity(login_embedding, user_embedding)

            #update best match if similarity is higher than best similarity
            if similarity > best_similarity:
                best_similarity = similarity
                best_match_id = user.id

        # if best similarity is above threshold, login successful
        if best_similarity > RECOGNITION_THRESHOLD:
            return {"message": "Login successful", "user_id": best_match_id, "similarity": float(best_similarity)}
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Login failed, best match similarity ({best_similarity:.2f}) lower than threshold ({RECOGNITION_THRESHOLD})"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occured while logging in: {str(e)}"
        )
