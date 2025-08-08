from sqlalchemy import Column, UUID, TIMESTAMP, text, String, Float
from sqlalchemy.dialects.postgresql import UUID as PostgresUUID
from pgvector.sqlalchemy import Vector
import uuid
import os

from ..core.database import Base

class User(Base):
    __tablename__ = "users"

    # UUID type primary key, auto generated
    id = Column(PostgresUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # pgvector embedding column 512
    face_embedding = Column(Vector(512), nullable=False)

    # Recognition threshold for this user
    recognition_threshold = Column(Float, nullable=False, default=0.6)

    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()")) 