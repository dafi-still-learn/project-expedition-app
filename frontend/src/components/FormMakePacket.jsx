import { useState } from "react";
import { sendDataPengiriman } from "../services/dataPengiriman";

function FormDelivery({
  setNameD,
  setJenisD,
  setJumlahD,
  setAsalD,
  setTujuanD,
  setBeratD,
  setJalurD,
}) {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [asal, setAsal] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [berat, setBerat] = useState("");
  const [jalur, setJalur] = useState("");

  const getData = () => {
    setNameD(name);
    setJumlahD(jumlah);
    setJenisD(jenis);
    setAsalD(asal);
    setTujuanD(tujuan);
    setBeratD(berat);
    setJalurD(jalur);
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
      jalur == ""
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
        jalur,
      );

      if (result === true) {
        console.log("data anda berhasil dikirim");
        console.log(
          "harga paket dari barang yang akan dikirim",
          result["data_harga"],
        );
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
              jalur pengiriman
              <select
                name="packet-mitra"
                id=""
                onChange={(e) => setJalur(e.target.value)}
              >
                <option value="darat">Darat</option>
                <option value="laut">Laut</option>
                <option value="udara">Udara</option>
              </select>
            </label>
          </div>
          <div className="row-span-2">
            <label htmlFor="price">
              price:
              <h1>{}</h1>
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
