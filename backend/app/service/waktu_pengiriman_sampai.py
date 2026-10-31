from datetime import datetime, timedelta

def waktu_pengiriman(jarak, jalur):
    waktu_buat = datetime.now()
    
    # BAGIAN KONDISI UNTUK DARAT
    if(jarak > 50 and jalur == "darat"):
        return {
            "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
            "waktu_sampai":(waktu_buat + timedelta(days=10)).strftime("%Y-%m-%d")
        }
    elif(jarak > 40  and jalur == "darat"):
        return{
            "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
            "waktu_sampai":(waktu_buat + timedelta(days=8)).strftime("%Y-%m-%d")
        } 
    elif(jarak > 30  and jalur == "darat"):
        return{
            "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
            "waktu_sampai":(waktu_buat + timedelta(days=6)).strftime("%Y-%m-%d")
        }
    elif(jarak > 20  and jalur == "darat"):
        return{
            "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
            "waktu_sampai":(waktu_buat + timedelta(days=4)).strftime("%Y-%m-%d")
        }
    elif(jarak > 10  and jalur == "darat"):
        return{
            "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
            "waktu_sampai":(waktu_buat + timedelta(days=2)).strftime("%Y-%m-%d")
        }
    
    # BAGIN UNTUK KONDISI LAUT
    elif(jarak > 50 and jalur == "laut"):
        return {
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai":(waktu_buat + timedelta(days=20)).strftime("%Y-%m-%d")
        }
    elif(jarak > 40  and jalur == "laut"):
            return{
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai": (waktu_buat + timedelta(days=16)).strftime("%Y-%m-%d")
            }
    elif(jarak > 30  and jalur == "laut"):
            return{
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai":(waktu_buat + timedelta(days=12)).strftime("%Y-%m-%d")
            } 
    elif(jarak > 20  and jalur == "laut"):
            return{
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai":(waktu_buat + timedelta(days=8)).strftime("%Y-%m-%d")
            }
    elif(jarak > 10  and jalur == "laut"):
            return {
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai": (waktu_buat + timedelta(days=4)).strftime("%Y-%m-%d")
            }
            
    # BAGAIN KONDISI UNTUK UDARA
    elif(jarak > 50 and jalur == "udara"):
            return{
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai":(waktu_buat + timedelta(days=5)).strftime("%Y-%m-%d")
            } 
    elif(jarak > 40  and jalur == "udara"):
            return{
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai":(waktu_buat + timedelta(days=4)).strftime("%Y-%m-%d")
            }
    elif(jarak > 30  and jalur == "udara"):
            return{
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai":(waktu_buat + timedelta(days=3)).strftime("%Y-%m-%d")
            }
    elif(jarak > 20  and jalur == "udara"):
            return {
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai":(waktu_buat + timedelta(days=3)).strftime("%Y-%m-%d")
            }
    elif(jarak > 10  and jalur == "udara"):
            return {
                "waktu_berangkat": (waktu_buat).strftime("%Y-%m-%d"),
                "waktu_sampai":(waktu_buat + timedelta(days=3)).strftime("%Y-%m-%d")
            }
            