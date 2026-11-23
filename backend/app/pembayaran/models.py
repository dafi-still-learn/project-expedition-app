from app.database.connection import Base
from sqlalchemy import Column, BigInteger, String, DateTime
from sqlalchemy.orm import relationship

class Pembayaran(Base):
    __tablename__ = "pembayaran"
    
    id = Column(BigInteger, primary_key=True, index=True)
    id_paket = Column(BigInteger)
    tanggal_pembayaran = Column(DateTime)
    pihak_pembayaran = Column(String)
    nominal_pembayaran = Column(String)
    metode_pembayaran = Column(String)
    
    paket = relationship("Paket", back_populates="pembayaran")