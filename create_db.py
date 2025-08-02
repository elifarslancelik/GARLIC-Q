import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.app.db import engine, Base

def create_tables():
    """
    create all tables in the database
    """
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")


if __name__ == "__main__":
    create_tables() 