from fastapi import APIRouter, File, UploadFile, Depends, status
from sqlalchemy.orm import Session

from ...core.database import get_db
from ...services.auth_service import auth_service

router = APIRouter(prefix="/users", tags=["Authentication"])

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup_user(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    Signup user with face recognition, add vector to database, return user id
    """
    image_bytes = await file.read()
    return auth_service.signup_user(image_bytes, db)

@router.post("/login")
async def login_user(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    Login user with face recognition, return user id
    """
    image_bytes = await file.read()
    return auth_service.login_user(image_bytes, db) 