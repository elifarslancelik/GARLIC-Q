import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/garlic_q")
    
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "GARLIC-Q"
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080"
    ]
    
    # Face Recognition Settings
    USER_LIMIT: int = 50
    RECOGNITION_THRESHOLD: float = 0.6
    
    # Ollama Settings
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    
    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FILE: str = "backend.log"

settings = Settings() 