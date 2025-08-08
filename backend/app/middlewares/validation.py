"""
Input Validation Middleware

This module provides input validation and sanitization to prevent
malicious input and file upload attacks.
"""

import re
from fastapi import HTTPException, Request
from typing import Optional

class InputValidationMiddleware:
    @staticmethod
    def validate_file_size(content_length: Optional[int], max_size_mb: int = 10) -> bool:
        """Validate file size"""
        if content_length is None:
            return True
        
        max_size_bytes = max_size_mb * 1024 * 1024
        return content_length <= max_size_bytes
    
    @staticmethod
    def validate_content_type(content_type: str) -> bool:
        """Validate content type for file uploads"""
        allowed_types = [
            'image/jpeg',
            'image/jpg', 
            'image/png',
            'image/webp'
        ]
        return content_type in allowed_types
    
    @staticmethod
    def sanitize_input(text: str) -> str:
        """Basic input sanitization"""
        # Remove potentially dangerous characters
        sanitized = re.sub(r'[<>"\']', '', text)
        return sanitized.strip()
    
    @staticmethod
    def validate_request(request: Request) -> None:
        """Validate incoming request"""
        # Check file size for uploads
        if request.method == "POST" and "/users/" in request.url.path:
            content_length = request.headers.get("content-length")
            if content_length and not InputValidationMiddleware.validate_file_size(int(content_length)):
                raise HTTPException(
                    status_code=413,
                    detail="File too large. Maximum size is 10MB."
                )
            
            content_type = request.headers.get("content-type", "")
            if not InputValidationMiddleware.validate_content_type(content_type):
                raise HTTPException(
                    status_code=400,
                    detail="Invalid file type. Only JPEG, PNG, and WebP images are allowed."
                )

async def validation_middleware(request: Request, call_next):
    """Input validation middleware"""
    try:
        InputValidationMiddleware.validate_request(request)
        response = await call_next(request)
        return response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Invalid request format."
        )
