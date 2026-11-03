import "../css/MakeDelivery.css";
import FormDelivery from "../components/FormMakePacket";
import { useState } from "react";
import { EstimasiWaktuPengiriman } from "../services/EstimasiWaktuPengiriman";
import { EstimasiJarak } from "../services/EstimasiJarak";
import { HargaPengiriman } from "../services/hargaPengiriman";

function Buat_pengiriman() {
  const [name, setNameD] = useState("");
  const [pengirim, setPengirimD] = useState("");
  const [jenis, setJenisD] = useState("");
  const [jumlah, setJumlahD] = useState("");
  const [asal, setAsalD] = useState("");
  const [tujuan, setTujuanD] = useState("");
  const [berat, setBeratD] = useState("");
  const [jalur, setJalurD] = useState("");
  const [nomorHpPengirim, setNomorHpPengirimD] = useState("");
  const [nomorHpPenerima, setNomorHpPenerimaD] = useState("");

  const [jarak, setJarak] = useState("");
  const [idAsal, setIdAsalD] = useState("");
  const [idTujuan, setIdTujuanD] = useState("");

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
                  setNamaPengirimD={setPengirimD}
                  setJenisD={setJenisD}
                  setJumlahD={setJumlahD}
                  setAsalD={setAsalD}
                  setTujuanD={setTujuanD}
                  setBeratD={setBeratD}
                  setJalurD={setJalurD}
                  setNomorHpPengirimD={setNomorHpPengirimD}
                  setNomorHpPenerimaD={setNomorHpPenerimaD}
                  setIdAsalD={setIdAsalD}
                  setIdTujuanID={setIdTujuanD}
                />
              </div>
            </div>
            <div className="col-span-2" id="detail-make-delivery">
              <div>
                <h1>detail packet</h1>
                <ul>
                  <li>
                    <h1>NAMA PAKET:</h1>
                    <h1>{name}</h1>
                  </li>
                  <li>
                    <h1>NAMA PENGIRIM:</h1>
                    <h1>{pengirim}</h1>
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
                    <h1>ESTIMASI JARAK: </h1>
                    {asal && tujuan && (
                      <EstimasiJarak
                        kodeWilayahAsal={idAsal}
                        kodeWilayahTujuan={idTujuan}
                        setJarakD={setJarak}
                      />
                    )}
                  </li>
                  <li>
                    <h1>BERAT PAKET</h1>
                    <h1>{berat}</h1>
                  </li>
                  <li>
                    <h1>MITRA PENGIRIMAN:</h1>
                    <h1>{jalur}</h1>
                  </li>
                  <li>
                    <h1>ESTIMASI WAKTU SAMPAI: </h1>
                    {jarak && jalur && (
                      <EstimasiWaktuPengiriman jarak={jarak} jalur={jalur} />
                    )}
                  </li>
                  <li>
                    <h1>NOMOR HP PENGIRIM:</h1>
                    <h1>{nomorHpPengirim}</h1>
                  </li>
                  <li>
                    <h1>NOMOR HP PENERIMA:</h1>
                    <h1>{nomorHpPenerima}</h1>
                  </li>
                </ul>
              </div>
              <div>
                {jarak && berat && jalur && jenis && (
                  <HargaPengiriman
                    berat={berat}
                    jarak={jarak}
                    jalur={jalur}
                    jenis={jenis}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Buat_pengiriman;
