from fastapi import APIRouter
from app.wilayah.schema import Package, Coord
from math import radians, sin, cos, asin, sqrt

router = APIRouter(prefix="/api")

def haversine(c1: Coord, c2: Coord) -> float:
    R = 6371
    
    lat1, lon1 = radians(c1.lat), radians(c1.lng)
    lat2, lon2 = radians(c2.lat), radians(c2.lng)
    
    dlat, dlon = lat2 - lat1, lon2 - lon1
    
    a = sin(dlat/2)**2 + cos(lat1)*cos(lat2)*sin(dlon/2)**2
    
    return 2 * R * asin(sqrt(a))

# MENGEMBALIKAN JARAK BERDASARKAN KOORDINAT ASAL DAN TUJUAN
@router.post("/packages")
def create_package(pkg: Package):
    distance = haversine(pkg.origin, pkg.destination)
    
    record= {
        "origin": pkg.origin.model_dump(),
        "destination": pkg.destination.model_dump(),
        "distance_km": round(distance, 2)
    }
    
    return record
