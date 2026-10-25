import "../css/Profil.css";
import "../index.css";
import { useState } from "react";
import { postDataProfil } from "../services/dataProfil";

function Profil() {
  const [nama, setNama] = useState("");
  const [panggilan, setPanggilan] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [penempatan, setPenempatan] = useState("");
  const [jabatan, setJabatan] = useState("");

  const handlerProfil = async () => {
    try {
      const response = await postDataProfil(
        nama,
        panggilan,
        tanggalLahir,
        nomorHp,
        alamat,
        penempatan,
        jabatan,
      );

      return response;
    } catch (err) {
      console.log("terjadi error pada pengiriman data profil", err);
    }
  };

  return (
    // DIGUNAKAN UNTUK FORM PENGISINA DATA PROFIL
    <>
      <div id="profil-container">
        <h1>buat profil</h1>
        <form onSubmit={handlerProfil} className="gr">
          <label htmlFor="nama">
            masukkan nama
            <input
              type="text"
              name="nama"
              id="nama"
              onChange={(e) => setNama(e.target.value)}
            />
          </label>

          <label htmlFor="panggilan">
            masukkan panggilan
            <input
              type="text"
              name="panggilan"
              id="panggilan"
              onChange={(e) => setPanggilan(e.target.value)}
            />
          </label>

          <label htmlFor="tanggalLahir">
            masukkan tanggal lahir
            <input
              type="text"
              name="tanggalLahir"
              id="tanggalLahir"
              onChange={(e) => setTanggalLahir(e.target.value)}
            />
          </label>

          <label htmlFor="nomorHp">
            masukkan nomor hp
            <input
              type="text"
              name="nomorHp"
              id="nomorHp"
              onChange={(e) => setNomorHp(e.target.value)}
            />
          </label>

          <label htmlFor="alamat">
            masukkan alamat sekarang
            <input
              type="text"
              name="alamat"
              id="alamat"
              onChange={(e) => setAlamat(e.target.value)}
            />
          </label>

          <label htmlFor="penempatan">
            masukkan penempatan sekarang
            <input
              type="text"
              name="penempatan"
              id="penempatan"
              onChange={(e) => setPenempatan(e.target.value)}
            />
          </label>

          <label htmlFor="jabatan">
            masukkan jabatan sekarang
            <input
              type="text"
              name="jabatan"
              id="jabatan"
              onChange={(e) => setJabatan(e.target.value)}
            />
          </label>

          <button type="submit">kirim</button>
        </form>
      </div>
    </>
  );
}

export default Profil;
