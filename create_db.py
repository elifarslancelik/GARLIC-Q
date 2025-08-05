#!/usr/bin/env python3

import os
import psycopg2
import logging
from sqlalchemy import create_engine, text
from backend.app.db import Base, engine
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('database.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def init_database():
    """Initialize the database with pgvector extension and create tables"""
    
    # Get database connection from environment
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise ValueError("DATABASE_URL environment variable must be set")
    
    # Parse database URL for connection parameters
    from urllib.parse import urlparse
    parsed = urlparse(database_url)
    
    db_params = {
        'host': parsed.hostname,
        'port': parsed.port or 5432,
        'database': parsed.path.lstrip('/'),
        'user': parsed.username,
        'password': parsed.password
    }
    
    # Validate required parameters
    if not all([db_params['host'], db_params['database'], db_params['user']]):
        raise ValueError("DATABASE_URL must include host, database, and user")
    
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(**db_params)
        conn.autocommit = True
        cursor = conn.cursor()
        
        # Enable pgvector extension
        logger.info("Enabling pgvector extension...")
        cursor.execute("CREATE EXTENSION IF NOT EXISTS vector;")
        
        # Create database if it doesn't exist
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_params['database'],))
        if not cursor.fetchone():
            logger.info(f"Creating database: {db_params['database']}")
            cursor.execute(f"CREATE DATABASE {db_params['database']};")
        
        cursor.close()
        conn.close()
        
        # Create tables using SQLAlchemy
        logger.info("Creating tables...")
        Base.metadata.create_all(bind=engine)
        
        logger.info("Database initialization completed successfully!")
        
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise

if __name__ == "__main__":
    init_database() 