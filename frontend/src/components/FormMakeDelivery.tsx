import React, { useState, useEffect, FormEvent } from "react";
import { OnInputWilayah } from "../services/inputAutoCompleteWilayah";
import { postDataPaket } from "../services/dataPengiriman";
import { ConfirmPay } from "./ConfirmPay";
import { HandlePembayaran } from "../services/MetodePembayaran";

type FormDeliveryProps = {
  setNameD: (value: string) => void;
  setNamaPengirimD: (value: string) => void;
  setJenisD: (value: string) => void;
  setJumlahD: (value: number) => void;
  setAsalD: (value: string) => void;
  setTujuanD: (value: string) => void;
  setBeratD: (value: number) => void;
  setJalurD: (value: string) => void;
  setNomorHpPengirimD: (value: string) => void;
  setNomorHpPenerimaD: (value: string) => void;
  //
  jarak: number;
  tanggalPengirimanD: string;
  tanggalSampaiD: string;
  hargaPengirimanD: string;
  //
  setIdAsalD: (value: string) => void;
  setIdTujuanD: (value: string) => void;
  setIdPaketD: (value: number) => void;
};

function FormDelivery({
  setNameD,
  setNamaPengirimD,
  setJenisD,
  setJumlahD,
  setAsalD,
  setTujuanD,
  setBeratD,
  setJalurD,
  jarak,
  setNomorHpPengirimD,
  setNomorHpPenerimaD,

  tanggalPengirimanD,
  tanggalSampaiD,
  hargaPengirimanD,

  //
  setIdAsalD,
  setIdTujuanD,
  setIdPaketD,
}: FormDeliveryProps): React.JSX.Element {
  const [handleConfirm, setHandleConfirm] = useState<boolean>(false);
  const [handlePayment, setHandelPayment] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [pengirim, setPengirim] = useState<string>("");
  const [jenis, setJenis] = useState<string>("");
  const [jumlah, setJumlah] = useState<number>(0);
  const [asal, setAsal] = useState<string>("");
  const [tujuan, setTujuan] = useState<string>("");
  const [berat, setBerat] = useState<number>(0);
  const [jalur, setJalur] = useState<string>("");
  // const [jarak, setJarak] = useState<number | null>(null);
  const [nomorHpPengirim, setNomorHpPengirim] = useState<string>("");
  const [nomorHpPenerima, setNomorHpPenerima] = useState<string>("");
  //
  // const [tanggalPengiriman, setTanggalPengiriman] = useState<string>("");
  // const [tanggalSampai, setTanggalSampai] = useState<string>("");
  // const [hargaPengiriman, setHargaPengiriman] = useState<string>("");

  const [idAsal, setIdAsal] = useState<string>("");
  const [idTujuan, setIdTujuan] = useState<string>("");

  const [idPaket, setIdPaket] = useState<number>(0);

  console.log("tanggal pengiriman", typeof tanggalPengirimanD);
  console.log("tanggal sampai", tanggalSampaiD);
  console.log("harga pengiriman", hargaPengirimanD);

  console.log("id paket", idPaket);
  // console.log("isi dari jarak", jarak);
  useEffect(() => {
    setNameD(name);
    setNamaPengirimD(pengirim);
    setJumlahD(jumlah);
    setJenisD(jenis);
    setAsalD(asal);
    setTujuanD(tujuan);
    setBeratD(berat);
    setJalurD(jalur);

    // if (setJarak !== null && Number.isFinite(setJarak)) {
    //   setJarakD(setJarak);
    // }
    setNomorHpPengirimD(nomorHpPengirim);
    setNomorHpPenerimaD(nomorHpPenerima);
    //
    // setTanggalPengirimanD();
    // setTanggalSampaiD();
    // setHargaPengirimanD();

    setIdAsalD(idAsal);
    setIdTujuanD(idTujuan);

    setIdPaketD(idPaket);
  }, [
    name,
    pengirim,
    jumlah,
    jenis,
    asal,
    tujuan,
    berat,
    jalur,
    nomorHpPengirim,
    nomorHpPenerima,

    tanggalPengirimanD,
    tanggalSampaiD,
    hargaPengirimanD,
    //
    idAsal,
    idTujuan,
    idPaket,
    setNameD,
    setNamaPengirimD,
    setJumlahD,
    setJenisD,
    setAsalD,
    setTujuanD,
    setBeratD,
    setJalurD,
    setNomorHpPengirimD,
    setNomorHpPenerimaD,
    //
    // setTanggalPengirimanD,
    // setTanggalSampaiD,
    // setHargaPengirimanD,
    //
    setIdAsalD,
    setIdTujuanD,
    setIdPaketD,
  ]);

  console.log("isi dari id asal", typeof idAsal);
  console.log("isi dari id jumlah", typeof jumlah);
  const handleDataPengiriman = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      name == "" ||
      pengirim == "" ||
      jenis == "" ||
      jumlah == 0 ||
      asal == "" ||
      tujuan == "" ||
      berat == 0 ||
      jalur == "" ||
      nomorHpPengirim == "" ||
      nomorHpPenerima == "" ||
      idAsal == "" ||
      idTujuan == "" ||
      jarak == 0 ||
      tanggalPengirimanD == null ||
      tanggalSampaiD == null ||
      hargaPengirimanD == null
    ) {
      console.log("ISI FORM DATA PENGIRIMAN DENGAN BENAR");
    } else {
      try {
        const result = await postDataPaket(
          name,
          pengirim,
          jenis,
          jumlah,
          asal,
          tujuan,
          berat,
          jalur,
          jarak,
          nomorHpPengirim,
          nomorHpPenerima,
          tanggalPengirimanD,
          tanggalSampaiD,
          hargaPengirimanD,
        );

        console.log("ini isi dari data pengiriman ", result);
        const body = result?.data;
        const paket = body?.result;

        const id_paket = paket?.id_paket;

        console.log("ini id paket ", id_paket);
        setIdPaket(id_paket);
        setHandleConfirm(true);
      } catch (err) {
        throw err;
      }
    }
  };

  // UNTUK TOMBOL YANG MENGATUR MEMASTIKAN BAHWA PEMERITAHUAN PENGISIAN DATA TELAH DIBACA OLEH USER
  const handleConfirmToggle = () => {
    setHandleConfirm(false);
  };
  // UNTUK TOMBOL YANG MEMASITKAN BAHWA USER SETUJU KE TAHAP SELANJUTNYA YAITU PEMBAYARAN DAN METODE NYA
  const handleConfirmTogglePay = () => {
    setHandleConfirm(false);
    setHandelPayment(true);
  };

  const handleConfirmPayment = () => {
    setHandelPayment(false);
  };

  return (
    <>
      <div id="container-form-packet" className="row-span-12">
        <form
          action=""
          className="grid row-span-12 grid-rows-13 gap-2 w-full h-full"
          id="form-packet"
          onSubmit={handleDataPengiriman}
        >
          <div className="row-span-13 flex flex-col gap-3">
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
            <label htmlFor="packet-pengirim">
              nama pengirim
              <input
                type="text"
                name="packet-pengirim"
                id=""
                placeholder="enter name pengirim"
                onChange={(e) => setPengirim(e.target.value)}
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
                  onChange={(e) => setJumlah(Number(e.target.value))}
                />
              </label>
            </label>
            <label htmlFor="packet-asal">
              asal paket
              <OnInputWilayah setName={setAsal} setIdDaerah={setIdAsal} />
            </label>
            <label htmlFor="packet-tujuan">
              tujuan paket
              <OnInputWilayah setName={setTujuan} setIdDaerah={setIdTujuan} />
            </label>
            <label htmlFor="packet-berat">
              berat paket
              <input
                type="text"
                name="packet-berat"
                id=""
                placeholder="enter name packet"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setBerat(Number.isFinite(value) ? value : 0);
                }}
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
            <label htmlFor="packet-nomorHp-pengirim">
              nomor hp pengirim
              <input
                type="text"
                name="packet-nomorHp-pengirim"
                id=""
                placeholder="enter nomor hp pengirim"
                onChange={(e) => setNomorHpPengirim(e.target.value)}
              />
            </label>
            <label htmlFor="packet-nomorHp-penerima">
              nomor hp penerima
              <input
                type="text"
                name="packet-nomorHp-penerima"
                id=""
                placeholder="enter nomor hp penerima"
                onChange={(e) => setNomorHpPenerima(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className="row-span-1">
            bayar
          </button>
        </form>
      </div>
      {handleConfirm && (
        <ConfirmPay
          onConfirm={handleConfirmToggle}
          onConfirmPay={handleConfirmTogglePay}
        />
      )}

      {handlePayment && (
        <HandlePembayaran onConfirmPembayaran={handleConfirmPayment} />
      )}
    </>
  );
}
export default FormDelivery;
