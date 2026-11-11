from sqlalchemy import Column, BigInteger, String, Numeric, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Paket(Base):
    __tablename__ = "paket"
    
    id = Column(BigInteger, primary_key=True, index=True)
    nama_paket = Column(String, nullable=False) 
    jenis_paket = Column(String, nullable=False)
    jumlah_paket = Column(Integer)
    asal_paket = Column(String)
    tujuan_paket = Column(String)
    berat_paket = Column(Numeric(10, 2))
    jalur_pengiriman = Column(String)
    jarak_paket = Column(Numeric(10, 2))
    nomor_hp_pengirim = Column(String)
    nomor_hp_penerima = Column(String)
    tanggal_pengiriman = Column(DateTime)
    tanggal_sampai = Column(DateTime)
    harga_pengiriman = Column(String)
    
    resi_paket = relationship("resi_paket" , back_populates="ResiPaket")

class ResiPaket(Base):
    __tablename__ = "resi_paket"
    
    id = Column(BigInteger, primary_key=True, index=True)
    id_paket = Column(BigInteger, ForeignKey("paket.id"))
    nama_paket =Column(String, ForeignKey("paket.nama_paket"))
    nomor_resi_paket = Column(String, nullable=False)
    
    paket = relationship("paket", back_populates="Paket")