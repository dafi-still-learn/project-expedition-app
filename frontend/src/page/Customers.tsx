import { useGetDataPelanggan } from "../hooks/useGetDataPelanggan";
import { Filter } from "@boxicons/react";

function Pelanggan() {
  const { dataPelanggan } = useGetDataPelanggan();
  return (
    <>
      <section
        className="overflow-hidden w-screen h-screen grid"
        id="Container-customer"
      >
        <div
          className="grid gap-6 grid-rows-5 overflow-hidden"
          id="pengiriman-card"
        >
          <div className="grid grid-rows-3 row-span-1 bg-red-200">
            <h1 className="row-span-1">daftar pelanggan</h1>

            <div className="row-span-2 gap-2">
              <h1>isi Filter</h1>
            </div>
          </div>
          <div className="row-span-4 grid grid-cols-1 gap-2 overflow-y-auto">
            {dataPelanggan.map((item: any) => (
              <>
                <ul key={item.id} className="grid grid-cols-22 cursor-pointer">
                  <li className="col-span-2">paket: {item.id}</li>
                  <li className="col-span-3">nama: {item.nama_pelanggan}</li>
                  <li className="col-span-4">nama paket: {item.nama_paket}</li>
                  <li className="col-span-4">
                    asal pengiriman: {item.asal_pengiriman}
                  </li>
                  <li className="col-span-4">
                    tujuan pengiriman: {item.tujuan_pengiriman}
                  </li>
                  <li className="col-span-4">
                    harga pengiriman: {item.harga_paket}
                  </li>
                  <li className="col-span-1">
                    jumlah paket: {item.jumlah_paket}
                  </li>
                </ul>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Pelanggan;
