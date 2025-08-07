import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "GARLIC-Q"
    
    # Environment detection
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # CORS Settings - Smart configuration based on environment
    BACKEND_CORS_ORIGINS: list = []
    
    if ENVIRONMENT == "production":
        # Production: Only allow specific domains
        BACKEND_CORS_ORIGINS = [
            "https://garlicq.cc",
            "http://garlicq.cc"
        ]
        # Add additional production domains from environment
        if os.getenv("CORS_ORIGINS"):
            BACKEND_CORS_ORIGINS.extend(os.getenv("CORS_ORIGINS").split(","))
    else:
        # Development: Allow localhost and common dev ports
        BACKEND_CORS_ORIGINS = [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:8080",
            "http://localhost:80",
            "http://localhost:8000",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:8080",
            "http://127.0.0.1:80",
            "http://127.0.0.1:8000"
        ]
        # Add additional development domains from environment
        if os.getenv("CORS_ORIGINS"):
            BACKEND_CORS_ORIGINS.extend(os.getenv("CORS_ORIGINS").split(","))
    
    # Face Recognition Settings
    USER_LIMIT: int = 50
    RECOGNITION_THRESHOLD: float = 0.6
    
    # Ollama Settings
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL")
    
    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FILE: str = "backend.log"

settings = Settings() 