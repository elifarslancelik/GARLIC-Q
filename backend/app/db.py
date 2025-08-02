#app/db.py

import os
from dotenv import load_dotenv

from sqlalchemy import create_engine, Column, UUID, TIMESTAMP, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#pgvector extension with sqlalchemy integration import
from pgvector.sqlalchemy import Vector

load_dotenv()

#take database url from env
DATABASE_URL = os.getenv("DATABASE_URL")

#create engine 'pool_pre_ping' control connection
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

#create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#sqlalchemy ORM models

Base = declarative_base()

# ORM for 'users' table
class User(Base):
    __tablename__ = "users"

    # UUID type primary key, auto generated
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))

    # pgvector embedding column 512
    face_embedding = Column(Vector(512), nullable=False)

    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"))

# dependency injection for FastAPI
# create func: open new database session for each request, end of: session closed
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()






