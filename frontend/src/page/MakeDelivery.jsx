import FormDelivery from "../components/FormMakePacket";
import { useState } from "react";
function Buat_pengiriman() {
  const [name, setNameD] = useState("");
  const [jenis, setJenisD] = useState("");
  const [jumlah, setJumlahD] = useState("");
  const [asal, setAsalD] = useState("");
  const [tujuan, setTujuanD] = useState("");
  const [berat, setBeratD] = useState("");
  const [mitra, setMitraD] = useState("");

  return (
    <>
      <section className="w-screen h-screen" id="Container-make-delivery">
        <div className="" id="make-delivery">
          <div
            className="grid grid-cols-5 gap-6 w-full h-full"
            id="make-delivery-card"
          >
            <div className="col-span-3 grid">
              <div className="grid grid-rows-13">
                <h1 className="row-span-1">form packet</h1>
                <FormDelivery
                  setNameD={setNameD}
                  setJenisD={setJenisD}
                  setJumlahD={setJumlahD}
                  setAsalD={setAsalD}
                  setTujuanD={setTujuanD}
                  setBeratD={setBeratD}
                  setMitraD={setMitraD}
                />
              </div>
            </div>
            <div className="col-span-2" id="detail-make-delivery">
              <h1>detail packet</h1>
              <ul>
                <li>
                  <h1>NAMA PAKET:</h1>
                  <h1>{name}</h1>
                </li>
                <li>
                  <h1>JENIS PAKET:</h1>
                  <h1>{jenis}</h1>
                </li>
                <li>
                  <h1>JUMLAH PAKET:</h1>
                  <h1>{jumlah}</h1>
                </li>
                <li>
                  <h1>ASAL PAKET:</h1>
                  <h1>{asal}</h1>
                </li>
                <li>
                  <h1>TUJUAN PAKET:</h1>
                  <h1>{tujuan}</h1>
                </li>
                <li>
                  <h1>BERAT PAKET</h1>
                  <h1>{berat}</h1>
                </li>
                <li>
                  <h1>MITRA PENGIRIMAN:</h1>
                  <h1>{mitra}</h1>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Buat_pengiriman;
