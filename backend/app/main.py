import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .core.database import Base, engine
from .api.v1 import auth_router, code_router, chat_router
from .middlewares import rate_limit_middleware, SecurityHeadersMiddleware, validation_middleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Setup FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="GARLIC-Q - AI-Hub"
)

# Add security middleware
app.add_middleware(SecurityHeadersMiddleware)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# Initialize database tables on startup
@app.on_event("startup")
async def startup_event():
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully!")
    except Exception as e:
        logger.error(f"Error during startup: {e}")
        raise

# Health check endpoint for Render monitoring
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": settings.PROJECT_NAME}

# Add security middleware to all routes
@app.middleware("http")
async def add_security_middleware(request, call_next):
    # Apply rate limiting
    response = await rate_limit_middleware(request, call_next)
    # Apply input validation
    response = await validation_middleware(request, lambda: response)
    return response

# Include API routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(code_router, prefix=settings.API_V1_STR)
app.include_router(chat_router, prefix=settings.API_V1_STR) 