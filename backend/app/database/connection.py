# TEMPAT MENGATUR KONEKASI DATABASE

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from pathlib import Path

Base = declarative_base()

load_dotenv(Path(__file__).resolve.parent.parent / ".env")

engine = create_engine(
    f"postgresql+psycopg2://{os.environ['USER']}:{os.environ['PASSWORD']}"
    f"@{os.environ["HOST"]}:{os.environ["POST"]}/{os.environ["DB_NAME"]}",
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    """Depedency FastAPI => hanya sekali klik, session & close"""
    
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()