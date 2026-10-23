from pydantic import BaseModel

class Coord(BaseModel):
    lat: float
    lng: float
    
class Package(BaseModel):
    origin: Coord
    destination: Coord
    
    