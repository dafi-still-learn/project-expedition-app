import { useState } from "react";

function FormDelivery({ setData }) {
  const [name, setName] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [jenis, setJenis] = useState("");
  const [asal, setAsal] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [berat, setBerat] = useState("");
  const [mitra, setMitra] = useState("");

  const getData = () => {
    const data = [
      {
        name: name,
        jumlah: jumlah,
        jenis: jenis,
        asal: asal,
        tujuan: tujuan,
        berat: berat,
        mitra: mitra,
      },
    ];

    setData(data);
  };

  return (
    <>
      <div id="container-form-packet" className="row-span-12">
        <form
          action=""
          className="grid grid-rows-13 gap-2 w-full h-full"
          id="form-packet"
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
            <label htmlFor="packet-jenis">
              jenis paket
              <input
                type="text"
                name="packet-jenis"
                id=""
                placeholder="enter jenis packet"
                onChange={(e) => setJenis(e.target.value)}
              />
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
            <label htmlFor="packet-berat">
              mitra pengiriman
              <input
                type="text"
                name="packet-pengiriman"
                id=""
                placeholder="enter name pengiriman"
                onChange={(e) => setMitra(e.target.value)}
              />
            </label>
          </div>
          <div className="row-span-2">
            <label htmlFor="price">
              price:
              <h1>Rp.530.000.00</h1>
            </label>
          </div>
          <button onClick={getData} className="row-span-1">
            pay
          </button>
        </form>
      </div>
    </>
  );
}
export default FormDelivery;
