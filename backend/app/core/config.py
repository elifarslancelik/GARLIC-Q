import os
from dotenv import load_dotenv

load_dotenv()

def validate_environment():
    """Validate required environment variables"""
    required_vars = ["DATABASE_URL"]
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

class Settings:
    # Database - Only from environment
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable must be set")
    
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "GARLIC-Q"
    
    # CORS Settings - Only Render domains
    BACKEND_CORS_ORIGINS: list = [
        "https://garlic-q.onrender.com"
    ]
    
    # Add additional CORS origins from environment if provided
    if os.getenv("CORS_ORIGINS"):
        BACKEND_CORS_ORIGINS.extend(os.getenv("CORS_ORIGINS").split(","))
    
    # Ollama Settings
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL")
    
    # Security Settings
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
    MAX_FILE_SIZE_MB: int = int(os.getenv("MAX_FILE_SIZE_MB", "10"))
    ENABLE_DEBUG: bool = os.getenv("ENABLE_DEBUG", "false").lower() == "true"

# Validate environment on import
validate_environment()

settings = Settings() 