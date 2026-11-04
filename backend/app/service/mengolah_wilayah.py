from math import radians, sin, cos, asin, sqrt
from app.wilayah.schema import Coord


# RUMUS MENGHASILKAN JARAK
def haversine(c1: Coord, c2: Coord) -> float:
    print("ini isi c1", c1)
    print("ini isi c2", c2)
    
    R = 6371
    
    lat1, lon1 = radians(c1["lat_wilayah"]), radians(c1["long_wilayah"])
    lat2, lon2 = radians(c2["lat_wilayah"]), radians(c2["long_wilayah"])
    
    dlat, dlon = lat2 - lat1, lon2 - lon1
    
    a = sin(dlat/2)**2 + cos(lat1)*cos(lat2)*sin(dlon/2)**2
    
    return 2 * R * asin(sqrt(a))