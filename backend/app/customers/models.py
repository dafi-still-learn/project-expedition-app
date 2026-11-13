from sqlalchemy import Column, BigInteger, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base

# MEMBUAT FORMAT KEPADA TABLE PELANGGAN UNTUK KEPERLUAN DATBASE

class Pelanggan(Base):
    __tablename__ = "pelanggan"
    
    id = Column(BigInteger, primary_key=True, index=True)
    id_paket = Column(BigInteger, ForeignKey("paket.id"))
    nama_pelanggan = Column(String)
    nomor_hp = Column(String)
    nama_paket = Column(String)
    asal_pengiriman = Column(String)
    tujuan_pengiriman = Column(String)
    pengirimn = Column(String)
    jumlah_paket = Column(Integer)
    harga_paket = Column(String)
    
    paket = relationship("Paket", back_populates="pelanggan")