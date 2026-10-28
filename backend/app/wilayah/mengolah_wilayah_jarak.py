from fastapi import APIRouter
from app.wilayah.schema import Package
from app.service.mengolah_wilayah import haversine

router_wilayah = APIRouter(prefix="/wilayah")
# MENGEMBALIKAN JARAK BERDASARKAN KOORDINAT ASAL DAN TUJUAN

router_wilayah.post("/jarak_paket")
def create_package(pkg: Package):
    distance = haversine(pkg.origin, pkg.destination)
    
    record= {
        "origin": pkg.origin.model_dump(),
        "destination": pkg.destination.model_dump(),
        "distance_km": round(distance, 2)
    }
    
    return record
