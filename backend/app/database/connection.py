# TEMPAT MENGATUR KONEKASI DATABASE

from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from pathlib import Path

Base = declarative_base()

# Load .env file dari folder backend/.env
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

# Gunakan URL.create agar karakter spesial di password (seperti #, @, !, dll)
# otomatis di-encode dengan aman oleh SQLAlchemy.
SQLALCHEMY_DATABASE_URL = URL.create(
    drivername="postgresql+psycopg2",
    username=os.environ.get("DB_USER", "expedition_app"),
    password=os.environ.get("PASSWORD", ""),
    host=os.environ.get("HOST", "localhost"),
    port=int(os.environ.get("PORT", 5432)),
    database=os.environ.get("DB_NAME", "postgres"),
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    """Dependency FastAPI => session & close"""
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()
