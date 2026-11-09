import "../css/PacketTrack.css";
import baseURL from "../api/Axios";

import LeafletMap from "../services/PengirimanOpenStreetMap";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

function Lacak_paket() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dataResi, setDataResi] = useState([]);
  const [resiPaket, setResiPaket] = useState("");

  const handleDataResi = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await baseURL.get(
        `/packet/resi_paket?resi_paket=${resiPaket}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("isi dari respose pelacak paket ", response);

      setDataResi(response?.data || []);
    } catch (err) {
      console.log("terjadi error ", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <h1>sedang mencari data paket...</h1>
      </>
    );
  }

  console.log("isi state dari state dataResi Paket ", dataResi);
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
                <LeafletMap />
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
                <ul>
                  <li>id paket: {dataResi.id}</li>
                  <li>nama paket: {dataResi.nama_paket}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Lacak_paket;
