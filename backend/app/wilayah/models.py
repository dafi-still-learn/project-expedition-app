from sqlalchemy import Column, BigInteger, String, Numeric 
from geoalchemy2 import Geometry
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Wilayah(Base):
    __tablename__ = "wilayah"
    
    id = Column(BigInteger, primary_key=True, index=True)
    kode_wilayah = Column(String(255))
    nama_wilayah = Column(String(255))
    type_wilayah = Column(String(255))
    lat_wilayah = Column(Numeric(10,7))
    long_wilayah =Column(Numeric(10, 7))
    status_wilayah = Column(String(255))
    geom = Column(Geometry(geometry_type='POINT', srid=4326))

