from sqlalchemy import Column, BigInteger, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base

# MEMBUAT FORMAT KEPADA TABLE PELANGGAN UNTUK KEPERLUAN DATBASE

class Pelanggan(Base):
    __tablename__ = "pelanggan"
    
    id = Column(BigInteger, primary_key=True, index=True)
    id_paket = Column(BigInteger, ForeignKey("pelanggan.id"))
    nama_pelanggan = Column(String)
    nomor_hp = Column(String)
    nama_paket = Column(String)
    asal_pengiriman = Column(String)
    tujuan_pengirimn = Column(String)
    jumlah_paket = Column(Integer)
    harga_paket = Column(String)
    
    pelanggan = relationship("paket", back_populates="paket")