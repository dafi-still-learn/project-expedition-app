from pydantic import BaseModel

class Coord(BaseModel):
    lat_wilayah: float
    long_wilayah: float
    
class Package(BaseModel):
    origin: Coord
    destination: Coord
    
    