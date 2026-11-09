import sys
sys.path.insert(0, '/home/fauzan-dafi/project-expedition-app/backend')

from app.database.database_packet import get_data_harga_tanggal
from app.database.database_customers import get_data_all_pelanggan

print("=" * 50)
print("Testing get_data_all_paket()")
print("=" * 50)

result = get_data_all_pelanggan()

print("\nHasil dari get_data_all_paket():")
print(result)
print("\nTipe data hasil:", type(result))

if result:
    print("\nData berhasil diambil!")
    if "data" in result:
        print(f"Jumlah data: {len(result['data'])}")
        print(f"Data: {result['data']}")
else:
    print("\nTidak ada data atau error")
