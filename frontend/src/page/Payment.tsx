import "../css/Payment.css";

import { useGetDataPelanggan } from "../hooks/useGetDataPelanggan";
import { FilterPembayaran } from "../services/FilterPembayaran";
import { useState } from "react";

function Pembayaran() {
  const { dataPelanggan } = useGetDataPelanggan();

  const [dataFilter, setDataFilter] = useState<any[]>([]);

  const displayData =
    Array.isArray(dataFilter) && dataFilter.length > 0
      ? dataFilter
      : dataPelanggan;
  console.log("data dari filter data ", displayData);

  return (
    <>
      <section className="w-screen h-screen" id="Container-payment">
        <div
          className="grid gap-6 grid-rows-12 w-full h-full overflow-auto"
          id="payment-card"
        >
          <div className="row-span-2 rounded-xl" id="filter-payment">
            <div className="w-full h-full">
              <FilterPembayaran filterData={setDataFilter}></FilterPembayaran>
            </div>
          </div>
          <div
            className="row-span-10 flex flex-col gap-3 overflow-y-auto rounded-xl"
            id="payment-item"
          >
            {dataPelanggan.map((item: any) => {
              return (
                <>
                  <ul
                    key={item.id}
                    className="grid grid-cols-16 cursor-pointer"
                  >
                    <li className="col-span-2">paket: {item.id}</li>
                    <li className="col-span-3">nama: {item.nama_pelanggan}</li>
                    <li className="col-span-4">
                      nama paket: {item.nama_paket}
                    </li>
                    {/* <li className="col-span-4">
                        asal pengiriman: {item.asal_pengiriman}
                      </li>
                      <li className="col-span-4">
                        tujuan pengiriman: {item.tujuan_pengiriman}
                      </li> */}
                    <li className="col-span-4">
                      harga pengiriman: {item.harga_paket}
                    </li>
                    <li className="col-span-2">
                      jumlah paket: {item.jumlah_paket}
                    </li>
                    <li className="col-span-1">status: lunas</li>
                  </ul>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Pembayaran;
