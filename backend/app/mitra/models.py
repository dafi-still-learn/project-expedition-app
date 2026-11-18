from sqlalchemy import BigInteger, String, Numeric, Column
from app.database.connection import Base

class WilayahMitra(Base):
    __tablename__ = "wilayah_mitra"
    
    id = Column(BigInteger, primary_key=True, index=True)
    
    