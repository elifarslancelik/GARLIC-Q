#!/usr/bin/env python3

import os
import psycopg2
import logging
from sqlalchemy import create_engine, text
from backend.app.db import Base, engine

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
    
    # Database connection parameters
    db_params = {
        'host': 'localhost',
        'port': 5432,
        'database': 'garlicq',
        'user': 'postgres',
        'password': 'password'
    }
    
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(**db_params)
        conn.autocommit = True
        cursor = conn.cursor()
        
        # Enable pgvector extension
        logger.info("Enabling pgvector extension...")
        cursor.execute("CREATE EXTENSION IF NOT EXISTS vector;")
        
        # Create database if it doesn't exist
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'garlicq'")
        if not cursor.fetchone():
            logger.info("Creating database...")
            cursor.execute("CREATE DATABASE garlicq;")
        
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