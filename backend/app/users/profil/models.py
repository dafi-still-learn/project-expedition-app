from sqlalchemy import Column, BigInteger, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Profil(Base):
    __tablename__ = "profil"
    
    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, ForeignKey("akun.id")) 
    email = Column(String, ForeignKey("akun.email"))
    nama_user = Column(String, unique=True)
    nama_panggilan = Column(String)
    tanggal_hari_user = Column(DateTime)
    nomor_hp_user = Column(String)
    alamat_sekarang = Column(String)
    penempatan = Column(String)
    jabatan_sekarang = Column(String)
    
    
    akun = relationship("akun", back_populates="Akun") 