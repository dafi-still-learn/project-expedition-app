import { useState } from "react";
import { Filter } from "@boxicons/react";
import DetailDelivery from "../components/DetailDelivery";
import { useGetDataPaket } from "../hooks/useGetDataPaket";

const Pengiriman = ({ dataFilter, openFilter }: any) => {
  const { dataPaket } = useGetDataPaket();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const displayData =
    Array.isArray(dataFilter) && dataFilter.length > 0 ? dataFilter : dataPaket;
  console.log("data dari filter data ", displayData);
  return (
    <>
      <section className="w-screen h-screen" id="Container-delivery">
        <div className="w-full h-full relative" id="delivery">
          <div
            className="grid gap-6 grid-cols-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="col-span-4 overflow-y-scroll grid gap-2">
              <div
                className="flex justify-between bg-amber-200"
                id="grup-filter"
              >
                <h1>pengiriman</h1>
                <div>
                  <button className="cursor-pointer">
                    <Filter onClick={openFilter} />
                  </button>
                </div>
              </div>
              <div className="overflow-y-scroll bg-red-200">
                {dataPaket.map((item) => (
                  <>
                    <ul
                      key={item.id}
                      className="grid grid-cols-28 cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <li className="col-span-2">paket: {item.id}</li>
                      <li className="col-span-3">nama: {item.nama_pengirim}</li>
                      <li className="col-span-5">
                        nama paket: {item.nama_paket}
                      </li>
                      <li className="col-span-4">
                        asal pengiriman: {item.asal_paket}
                      </li>
                      <li className="col-span-4">
                        tujuan pengiriman: {item.tujuan_paket}
                      </li>
                      <li className="col-span-5">
                        tanggal pengiriman:{" "}
                        {item.tanggal_pengiriman
                          ? typeof item.tanggal_pengiriman === "object" &&
                            item.tanggal_pengiriman instanceof Date
                            ? item.tanggal_pengiriman.toLocaleDateString(
                                "id-ID",
                              )
                            : new Date(
                                item.tanggal_pengiriman,
                              ).toLocaleDateString("id-ID")
                          : "Belum ada"}
                      </li>
                      <li className="col-span-4">
                        harga pengiriman: {item.harga_pengiriman}
                      </li>
                      <li className="col-span-1">
                        jumlah paket: {item.jumlah_paket}
                      </li>
                    </ul>
                  </>
                ))}
              </div>
            </div>
            <DetailDelivery
              id={selectedItem?.id}
              nama={selectedItem?.nama_pelanggan}
              nama_paket={selectedItem?.nama_paket}
              asal_paket={selectedItem?.asal_pengiriman}
              tujuan_paket={selectedItem?.tujuan_pengiriman}
              harga_paket={selectedItem?.harga_paket}
              jumlah_paket={selectedItem?.jumlah_paket}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Pengiriman;
