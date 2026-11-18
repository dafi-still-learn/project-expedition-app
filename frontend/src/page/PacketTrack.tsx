import baseURL from "../api/Axios";

import LeafletMap from "../services/PengirimanOpenStreetMap";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import PackageMapTracker from "../services/MapsForPacketTracker";

function Lacak_paket() {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataResi, setDataResi] = useState<any>(null);
  const [resiPaket, setResiPaket] = useState<string>("");
  const [lokasiAsal, setLokasiAsal] = useState<[number, number] | null>(null);
  const [lokasiTujuan, setLokasiTujuan] = useState<[number, number] | null>(
    null,
  );

  const handleDataResi = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await baseURL.get(
        `/packet/resi_paket?resi_paket=${resiPaket}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = response?.data;
      setDataResi(data || null);

      const asal = data?.data_lokasi_asal;
      const tujuan = data?.data_lokasi_tujuan;
      setLokasiAsal(
        Number.isFinite(asal?.lat) && Number.isFinite(asal?.lng)
          ? [asal.lat, asal.lng]
          : null,
      );
      setLokasiTujuan(
        Number.isFinite(tujuan?.lat) && Number.isFinite(tujuan?.lng)
          ? [tujuan.lat, tujuan.lng]
          : null,
      );
    } catch (err) {
      console.log("terjadi error ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-screen h-screen" id="Container-track-packet">
        <div className="w-full h-full" id="track-packet">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="grid row-span-4">
              <div id="list-pengiriman">
                <PackageMapTracker
                  lokasiAsal={lokasiAsal}
                  lokasiTujuan={lokasiTujuan}
                />
              </div>
            </div>
            <div className="row-span-1 grid grid-cols-2 gap-2">
              <form
                action=""
                className="p-100 border-black-200 grid grid-rows-2col-span-1 p-100 rounded-xl"
                onSubmit={handleDataResi}
              >
                <label
                  htmlFor="enter_id"
                  className="flex flex-col gap-2 row-span-1"
                >
                  masukkan nomor paket
                  <input
                    type="text"
                    name="enter_id"
                    className="p-10"
                    onChange={(e) => setResiPaket(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-200 row-span-1 w-30 h-10 cursor-pointer"
                >
                  kirim
                </button>
              </form>
              <div className="col-span-1">
                <h1>hasil pencarian:</h1>
                {loading ? (
                  <p>sedang mencari data paket...</p>
                ) : (
                  <ul>
                    <li>id paket: {dataResi?.id ?? "-"}</li>
                    <li>nama paket: {dataResi?.nama_paket ?? "-"}</li>
                    <li>nomor resi: {dataResi?.nomor_resi_paket ?? "-"}</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Lacak_paket;
