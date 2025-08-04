import logging
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
import numpy as np

from ..core.config import settings
from ..models.user import User
from .face_recognition_service import face_recognition_service

logger = logging.getLogger(__name__)

class AuthService:
    def __init__(self):
        self.face_service = face_recognition_service

    def signup_user(self, image_bytes: bytes, db: Session):
        """
        Signup user with face recognition, add vector to database, return user id
        """
        # Control user limit
        user_count = db.query(User).count()
        if user_count >= settings.USER_LIMIT:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"User limit reached, {settings.USER_LIMIT} users allowed"
            )
        
        try:
            embedding = self.face_service.get_face_embedding(image_bytes)

            if embedding is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Face detection failed"
                )
            
            # Create new user with embedding
            new_user = User(face_embedding=embedding.tolist())
            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            logger.info(f"User created successfully with ID: {new_user.id}")
            return {"message": "User created successfully", "user_id": new_user.id}
        
        except HTTPException:
            raise
        except Exception as e:
            db.rollback()
            logger.error(f"Error creating user: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred while creating user: {str(e)}"
            )

    def login_user(self, image_bytes: bytes, db: Session):
        """
        Login user with face recognition, return user id
        """
        try:
            login_embedding = self.face_service.get_face_embedding(image_bytes)

            if login_embedding is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Face detection failed or face not found"
                )
            
            # Pull all users face embeddings from database
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
                # Cosine similarity between login embedding and user embedding
                similarity = self.face_service.cosine_similarity(login_embedding, user_embedding)

                # Update best match if similarity is higher than best similarity
                if similarity > best_similarity:
                    best_similarity = similarity
                    best_match_id = user.id

            # If best similarity is above threshold, login successful
            if best_similarity > settings.RECOGNITION_THRESHOLD:
                logger.info(f"Login successful for user {best_match_id} with similarity {best_similarity}")
                return {
                    "message": "Login successful", 
                    "user_id": best_match_id, 
                    "similarity": float(best_similarity)
                }
            else:
                logger.warning(f"Login failed, best match similarity ({best_similarity:.2f}) lower than threshold ({settings.RECOGNITION_THRESHOLD})")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=f"Login failed, best match similarity ({best_similarity:.2f}) lower than threshold ({settings.RECOGNITION_THRESHOLD})"
                )
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error during login: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred while logging in: {str(e)}"
            )

# Global instance
auth_service = AuthService() 