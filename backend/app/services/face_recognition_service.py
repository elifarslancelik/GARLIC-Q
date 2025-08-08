import logging
import numpy as np
from PIL import Image
import io
import torch
from facenet_pytorch import InceptionResnetV1, MTCNN
from fastapi import HTTPException, status

from ..core.config import settings

logger = logging.getLogger(__name__)

class FaceRecognitionService:
    def __init__(self):
        self.mtcnn = None
        self.facenet_model = None
        self._load_models()
    
    def _load_models(self):
        """Load MTCNN and FaceNet models"""
        try:
            logger.info("Loading MTCNN model...")
            self.mtcnn = MTCNN()
            logger.info("MTCNN model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading MTCNN model: {e}")
            self.mtcnn = None

        try:
            logger.info("Loading FaceNet model...")
            # Try different pretrained options with fallback
            pretrained_options = ["vggface2", True]
            
            for option in pretrained_options:
                try:
                    logger.info(f"Trying to load FaceNet with pretrained={option}")
                    self.facenet_model = InceptionResnetV1(pretrained=option).eval()
                    logger.info(f"FaceNet model loaded successfully with pretrained={option}")
                    break
                except Exception as e:
                    logger.warning(f"Failed to load FaceNet with pretrained={option}: {e}")
                    continue
            
            if self.facenet_model is None:
                logger.error("All FaceNet model loading attempts failed")
                self.facenet_model = None
        except Exception as e:
            logger.error(f"Error loading FaceNet model: {e}")
            self.facenet_model = None

    def get_face_embedding(self, image_bytes: bytes):
        """
        Detect face from image bytes and create embedding vector
        """
        try:
            # Check if facenet model is loaded
            if self.facenet_model is None:
                logger.error("Error: facenet_model is not loaded")
                return None

            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            
            # Detect face using MTCNN
            if self.mtcnn is not None:
                boxes, _ = self.mtcnn.detect(image)
                
                if boxes is None or len(boxes) == 0:
                    logger.warning("No face detected in image")
                    return None
                
                # Get the first detected face
                box = boxes[0]
                x1, y1, x2, y2 = box
                face = image.crop((x1, y1, x2, y2))
            else:
                # Fallback: use the entire image if MTCNN is not available
                face = image

            # Resize face to 160x160 (FaceNet input size)
            face = face.resize((160, 160))
            
            # Convert to tensor
            face_tensor = torch.from_numpy(np.array(face)).permute(2, 0, 1).float()
            face_tensor = face_tensor.unsqueeze(0)  # Add batch dimension
            
            # Normalize
            face_tensor = face_tensor / 255.0
            
            # Get embedding
            with torch.no_grad():
                embedding = self.facenet_model(face_tensor)
                embedding = embedding.squeeze().cpu().numpy()
            
            return embedding
            
        except Exception as e:
            logger.error(f"Error in face embedding: {e}")
            return None

    def cosine_similarity(self, embedding1, embedding2):
        """
        Calculate cosine similarity between two embeddings
        """
        try:
            # Normalize embeddings
            norm1 = np.linalg.norm(embedding1)
            norm2 = np.linalg.norm(embedding2)
            
            if norm1 == 0 or norm2 == 0:
                return 0.0
            
            # Calculate cosine similarity
            similarity = np.dot(embedding1, embedding2) / (norm1 * norm2)
            return float(similarity)
        except Exception as e:
            logger.error(f"Error calculating cosine similarity: {e}")
            return 0.0

    def verify_face_match(self, login_embedding, user_embedding, threshold=0.6):
        """
        Verify if login embedding matches user embedding
        """
        similarity = self.cosine_similarity(login_embedding, user_embedding)
        return similarity > threshold, similarity

# Global instance
face_recognition_service = FaceRecognitionService() 