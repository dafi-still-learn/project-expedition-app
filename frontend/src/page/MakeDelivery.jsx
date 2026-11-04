import "../css/MakeDelivery.css";
import FormDelivery from "../components/FormMakePacket";
import { useState } from "react";
import { EstimasiWaktuPengiriman } from "../services/EstimasiWaktuPengiriman";
import { EstimasiJarak } from "../services/EstimasiJarak";
import { EstimasiHargaPengiriman } from "../services/EstimasiHargaPengiriman";
import { GenerateBarcode } from "../services/GenerateBarcode";

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
  const [tanggalPengiriman, setTanggalPengirimanD] = useState("");
  const [tanggalSampai, setTanggalSampaiD] = useState("");
  const [hargaPengiriman, setHargaPengirimanD] = useState("");

  const [jarak, setJarak] = useState("");

  const [idAsal, setIdAsalD] = useState("");
  const [idTujuan, setIdTujuanD] = useState("");

  const [idPaket, setIdPaketD] = useState("");

  console.log("ini isi id tujuan", idTujuan);
  console.log(idAsal);
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
                  //
                  setTanggalPengirimanD={setTanggalPengirimanD}
                  setTanggalSampaiD={setTanggalSampaiD}
                  setHargaPengirimanD={setHargaPengirimanD}
                  //
                  setIdAsalD={setIdAsalD}
                  setIdTujuanD={setIdTujuanD}
                  setIdPaketD={setIdPaketD}
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
                    <h1>JALUR PENGIRIMAN:</h1>
                    <h1>{jalur}</h1>
                  </li>
                  <li>
                    <h1>ESTIMASI WAKTU SAMPAI: </h1>
                    {jarak && jalur && (
                      <EstimasiWaktuPengiriman
                        jarak={jarak}
                        jalur={jalur}
                        setTanggalPengiriman={setTanggalPengirimanD}
                        setTanggalSampai={setTanggalSampaiD}
                      />
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
                <h1>ESTIMASI HARGA PENGIRIMAN:</h1>
                {jarak && berat && jalur && jenis && (
                  <EstimasiHargaPengiriman
                    berat={berat}
                    jarak={jarak}
                    jalur={jalur}
                    jenis={jenis}
                    setHargaPengiriman={setHargaPengirimanD}
                  />
                )}
              </div>
              <div>
                <h1>BARCODE PENGIRIMAN</h1>
                <hr />

                {name &&
                  pengirim &&
                  jenis &&
                  berat &&
                  asal &&
                  tujuan &&
                  jarak &&
                  nomorHpPengirim &&
                  nomorHpPenerima &&
                  idPaket && (
                    <GenerateBarcode id={idPaket} pengirim={pengirim} />
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
