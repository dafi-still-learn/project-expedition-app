from app.database.connection import Base
from sqlalchemy import Column, String, BigInteger, DateTime
from sqlalchemy.orm import relationship

class Kurir(Base):
    __tablename__ = "kurir"
    
    id = Column(BigInteger, primary_key=True, index=True)
    nama_kurir = Column(String)
    jalur_kurir = Column(String)
    daerah_kurir = Column(String)
    status_kurir = Column(String)
    nomor_hp_kurir = Column(String)
    rating_kurir = Column(String)
    alamat_kurir = Column(String)
    waktu_registrasi_kurir = Column(DateTime)
    
    