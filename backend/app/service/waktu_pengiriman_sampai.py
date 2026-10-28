from datetime import datetime

def waktu_pengiriman_darat(jarak, jalur):
    waktu_buat = datetime.now()
    if(jarak > 50 and jalur == "darat"):
        return {
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "10day"
        }
    elif(jarak > 40  and jalur == "darat"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "8day"
        } 
    elif(jarak > 30  and jalur == "darat"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "6day"
        }
    elif(jarak > 20  and jalur == "darat"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "4day"
        }
    elif(jarak > 10  and jalur == "darat"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "2day"
        }

def waktu_pengiriman_laut(jarak, jalur):
    waktu_buat = datetime.now()
    if(jarak > 50 and jalur == "laut"):
        return {
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "20day"
        }
    elif(jarak > 40  and jalur == "laut"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai": waktu_buat + "16day"
        }
    elif(jarak > 30  and jalur == "laut"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "12day"
        } 
    elif(jarak > 20  and jalur == "laut"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "8day"
        }
    elif(jarak > 10  and jalur == "laut"):
        return {
            "waktu_berangkat": waktu_buat,
            "waktu_sampai": waktu_buat + "4day"
        }
    
def waktu_pengiriman_udara(jarak, jalur):
    waktu_buat = datetime.now()
    if(jarak > 50 and jalur == "udara"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "5day"
        } 
    elif(jarak > 40  and jalur == "udara"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "4day"
        }
    elif(jarak > 30  and jalur == "udara"):
        return{
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "3day"
        }
    elif(jarak > 20  and jalur == "udara"):
        return {
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "2day"
        }
    elif(jarak > 10  and jalur == "udara"):
        return {
            "waktu_berangkat": waktu_buat,
            "waktu_sampai":waktu_buat + "2day"
        }