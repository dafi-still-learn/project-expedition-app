import { useGetDataPelanggan } from "../hooks/useGetDataPelanggan";
import { Filter } from "@boxicons/react";
import { useState } from "react";
import { FilterPelanggan } from "../services/filterPelanggan";

function Pelanggan() {
  const { dataPelanggan } = useGetDataPelanggan();

  const [dataFilter, setDataFilter] = useState<any[]>([]);

  const displayData =
    Array.isArray(dataFilter) && dataFilter.length > 0
      ? dataFilter
      : dataPelanggan;
  console.log("data dari filter data ", displayData);
  return (
    <>
      <section
        className="overflow-hidden w-screen h-screen grid"
        id="Container-customer"
      >
        <div
          className="grid gap-6 grid-rows-10 overflow-hidden"
          id="pengiriman-card"
        >
          <div className="flex place-item-center row-span-2 bg-red-200">
            <div className="w-full h-full">
              <FilterPelanggan filterData={setDataFilter}></FilterPelanggan>
            </div>
          </div>
          <div className="row-span-8 grid grid-cols-1 gap-2 overflow-y-auto">
            {displayData.length === 0 ? (
              <p className="text-center text-gray-500">Tidak ada data</p>
            ) : (
              displayData.map((item) => (
                <ul key={item.id} className="grid grid-cols-22 cursor-pointer">
                  <li className="col-span-2">paket: {item.id}</li>
                  <li className="col-span-3">nama: {item.nama_pelanggan}</li>
                  <li className="col-span-5">nama paket: {item.nama_paket}</li>
                  <li className="col-span-4">
                    asal pengiriman: {item.asal_pengiriman}
                  </li>
                  <li className="col-span-4">
                    tujuan pengiriman: {item.tujuan_pengiriman}
                  </li>
                  {/* <li className="col-span-5">
                    tanggal pengiriman:
                    {item.tanggal_pengiriman
                      ? typeof item.tanggal_pengiriman === "object" &&
                        item.tanggal_pengiriman instanceof Date
                        ? item.tanggal_pengiriman.toLocaleDateString("id-ID")
                        : new Date(item.tanggal_pengiriman).toLocaleDateString(
                            "id-ID",
                          )
                      : "Belum ada"}
                  </li> */}
                  <li className="col-span-4">
                    harga pengiriman: {item.harga_paket}
                  </li>
                </ul>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Pelanggan;
