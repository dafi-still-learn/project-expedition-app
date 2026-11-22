import { FilterKurir } from "../services/filterKurir";
import { useState } from "react";
import { useGetDataPelanggan } from "../hooks/useGetDataPelanggan";

function Kurir() {
  const { dataPelanggan } = useGetDataPelanggan();

  const [dataFilter, setDataFilter] = useState<any[]>([]);

  const displayData =
    Array.isArray(dataFilter) && dataFilter.length > 0
      ? dataFilter
      : dataPelanggan;
  console.log("data dari filter data ", displayData);
  return (
    <>
      <section className="w-screen h-screen grid" id="Container-courir">
        <div
          className="grid gap-6 grid-rows-10 overflow-hidden"
          id="pengiriman-card"
        >
          <div className="row-span-2">
            <div>
              <div className="w-full h-full">
                <FilterKurir filterData={setDataFilter}></FilterKurir>
              </div>
            </div>
          </div>
          <div className="row-span-8">
            {/* {courir_standby.map((item) => {
                return (
                  <ul className="row-span-1 grid grid-cols-12">
                    <li className="col-span-3">{item.nama}</li>
                    <li className="col-span-3">{item.jalur}</li>
                    <li className="col-span-3">{item.domisili_sekarang}</li>
                    <li className="col-span-3 font-bold">{item.status}</li>
                  </ul>
                );
              })} */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Kurir;
