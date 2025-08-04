from sqlalchemy import Column, UUID, TIMESTAMP, text
from pgvector.sqlalchemy import Vector

from ..core.database import Base

class User(Base):
    __tablename__ = "users"

    # UUID type primary key, auto generated
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))

    # pgvector embedding column 512
    face_embedding = Column(Vector(512), nullable=False)

    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()")) 