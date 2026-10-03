
def logika_harga(berat, jarak, jalur, jenis):
    if jalur == 'darat':
        if jenis == 'makanan':
            harga = (berat * 20000) + (jarak * 15000) + (berat * 10000)
        elif jenis == 'komoditi':
            harga = (berat * 20000) + (jarak * 15000) + (berat * (2 * 10000))
            return harga
        elif jenis == 'pangan':
            harga = (berat * 20000) + (jarak * 15000) + (berat * (3 * 10000))
            return harga
        elif jenis == 'mesin':
            harga = (berat * 20000) + (jarak * 15000) + (berat * (4 * 10000))
            return harga
        elif jenis == 'kendaraan':
            harga = (berat * 20000) + (jarak * 15000) + (berat * (5 * 10000))
            return harga

    elif jalur == 'laut':
        if jenis == 'makanan':
            harga = (berat * (2 * 20000)) + (jarak * 15000) + (berat * 15000)
        elif jenis == 'komoditi':
            harga = (berat * (2 * 20000)) + \
                (jarak * 15000) + (berat * (2 * 15000))
            return harga
        elif jenis == 'pangan':
            harga = (berat * (2 * 20000)) + \
                (jarak * 15000) + (berat * (3 * 15000))
            return harga
        elif jenis == 'mesin':
            harga = (berat * (2 * 20000)) + \
                (jarak * 15000) + (berat * (4 * 15000))
            return harga
        elif jenis == 'kendaraan':
            harga = (berat * (2 * 20000)) + \
                (jarak * 15000) + (berat * (5 * 15000))
            return harga

        return harga
    elif jalur == 'udara':
        if jenis == 'makanan':
            harga = (berat * (3 * 20000)) + \
                (jarak * 15000) + (berat * 20000)
        elif jenis == 'komoditi':
            harga = (berat * (3 * 20000)) + \
                (jarak * 15000) + (berat * (2 * 20000))
            return harga
        elif jenis == 'pangan':
            harga = (berat * (3 * 20000)) + \
                (jarak * 15000) + (berat * (3 * 20000))
            return harga
        elif jenis == 'mesin':
            harga = (berat * (3 * 20000)) + \
                (jarak * 15000) + (berat * (4 * 20000))
            return harga
        elif jenis == 'kendaraan':
            harga = (berat * (3 * 20000)) + \
                (jarak * 15000) + (berat * (5 * 20000))
            return harga
