import FormDelivery from "../components/FormMakeDelivery";
import React, { useState } from "react";
import { EstimasiWaktuPengiriman } from "../services/EstimasiWaktuPengiriman";
import { EstimasiJarak } from "../services/EstimasiJarak";
import { EstimasiHargaPengiriman } from "../services/EstimasiHargaPengiriman";
import { GenerateBarcode } from "../services/GenerateBarcode";

function Buat_pengiriman(): React.JSX.Element {
  const [name, setNameD] = useState<string>("");
  const [pengirim, setPengirimD] = useState<string>("");
  const [jenis, setJenisD] = useState<string>("");
  const [jumlah, setJumlahD] = useState<number>(0);
  const [asal, setAsalD] = useState<string>("");
  const [tujuan, setTujuanD] = useState<string>("");
  const [berat, setBeratD] = useState<number>(0);
  const [jalur, setJalurD] = useState<string>("");
  const [nomorHpPengirim, setNomorHpPengirimD] = useState<string>("");
  const [nomorHpPenerima, setNomorHpPenerimaD] = useState<string>("");

  const [tanggalPengiriman, setTanggalPengirimanD] = useState<string>("");
  const [tanggalSampai, setTanggalSampaiD] = useState<string>("");
  const [hargaPengiriman, setHargaPengirimanD] = useState<string>("");

  const [jarak, setJarak] = useState<number>(0);

  const [idAsal, setIdAsalD] = useState<string>("");
  const [idTujuan, setIdTujuanD] = useState<string>("");

  const [idPaket, setIdPaketD] = useState<number>(0);

  console.log("ini isi id tujuan", idTujuan);
  console.log("ini isi jarak", typeof jarak);
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
                  jarak={jarak}
                  setNomorHpPengirimD={setNomorHpPengirimD}
                  setNomorHpPenerimaD={setNomorHpPenerimaD}
                  //
                  tanggalPengirimanD={tanggalPengiriman}
                  tanggalSampaiD={tanggalSampai}
                  hargaPengirimanD={hargaPengiriman}
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
                    {jarak != null && jalur && (
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
                {jarak != null && berat && jalur && jenis && (
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

                {idPaket && (
                  <GenerateBarcode id={idPaket} pengirim={pengirim} />
                )}

                {idPaket && <button>bayar</button>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Buat_pengiriman;
