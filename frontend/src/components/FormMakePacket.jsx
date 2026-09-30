import { useState } from "react";
import { sendDataPengiriman } from "../services/dataPengiriman";

function FormDelivery({
  setNameD,
  setJenisD,
  setJumlahD,
  setAsalD,
  setTujuanD,
  setBeratD,
  setMitraD,
}) {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [asal, setAsal] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [berat, setBerat] = useState("");
  const [mitra, setMitra] = useState("");

  const getData = () => {
    setNameD(name);
    setJumlahD(jumlah);
    setJenisD(jenis);
    setAsalD(asal);
    setTujuanD(tujuan);
    setBeratD(berat);
    setMitraD(mitra);
  };

  getData();

  const handleDataPengiriman = async (e) => {
    e.preventDefault();

    if (
      name == "" ||
      jenis == "" ||
      jumlah == "" ||
      asal == "" ||
      tujuan == "" ||
      berat == "" ||
      mitra == ""
    ) {
      console.log("ISI FORM DATA PENGIRIMAN DENGAN BENAR");
    } else {
      const result = await sendDataPengiriman(
        name,
        jenis,
        jumlah,
        asal,
        tujuan,
        berat,
        mitra,
      );

      if (result === true) {
        console.log("data anda berhasil dikirim");
      } else {
        console.log("data anda gagal dikirim");
      }
    }
  };

  return (
    <>
      <div id="container-form-packet" className="row-span-12">
        <form
          action=""
          className="grid grid-rows-13 gap-2 w-full h-full"
          id="form-packet"
          onSubmit={handleDataPengiriman}
        >
          <div className="row-span-11 flex flex-col gap-3">
            <label htmlFor="packet-name">
              nama paket
              <input
                type="text"
                name="packet-name"
                id=""
                placeholder="enter name packet"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="packet-jenis">
              jenis paket
              <input
                type="text"
                name="packet-jenis"
                id=""
                placeholder="enter jenis packet"
                onChange={(e) => setJenis(e.target.value)}
              />
              <label htmlFor="packet-jumlah">
                jumlah paket
                <input
                  type="text"
                  name="packet-jumlah"
                  id=""
                  placeholder="enter berat packet"
                  onChange={(e) => setJumlah(e.target.value)}
                />
              </label>
            </label>
            <label htmlFor="packet-asal">
              asal paket
              <input
                type="text"
                name="packet-asal"
                id=""
                placeholder="enter asal packet"
                onChange={(e) => setAsal(e.target.value)}
              />
            </label>
            <label htmlFor="packet-tujuan">
              tujuan paket
              <input
                type="text"
                name="packet-tujuan"
                id=""
                placeholder="enter tujuan packet"
                onChange={(e) => setTujuan(e.target.value)}
              />
            </label>
            <label htmlFor="packet-berat">
              berat paket
              <input
                type="text"
                name="packet-berat"
                id=""
                placeholder="enter name packet"
                onChange={(e) => setBerat(e.target.value)}
              />
            </label>
            <label htmlFor="packet-mitra">
              mitra pengiriman
              <select
                name="packet-mitra"
                id=""
                onChange={(e) => setMitra(e.target.value)}
              >
                <option value="JNE Express">JNE Express</option>
                <option value="J&T Ekspress">J$T Ekspress</option>
                <option value="SiCepat Ekspress">SiCepat Ekspres</option>
                <option value="Pos Indonesia">Pos Indonesia</option>
                <option value="TIKI (TITIPAN KILAT)">
                  TIKI "TITIPAN KILAT"
                </option>
                <option value="Lion Parcel">Lion Parcel</option>
                <option value="SAPX Ekspress">SAPX Ekspress</option>
                <option value="Anteraja">Anteraja</option>
              </select>
            </label>
          </div>
          <div className="row-span-2">
            <label htmlFor="price">
              price:
              <h1>Rp.530.000.00</h1>
            </label>
          </div>
          <button type="submit" className="row-span-1">
            pay
          </button>
        </form>
      </div>
    </>
  );
}
export default FormDelivery;
