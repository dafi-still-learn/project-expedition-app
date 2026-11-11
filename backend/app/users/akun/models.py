from sqlalchemy import Column, BigInteger, String, Numeric, DateTime
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Akun(Base):
    __tablename__ = "akun"
    id = Column(BigInteger, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    username = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)

    profil = relationship("profil", back_populates="Profil", uselist=False)
    
