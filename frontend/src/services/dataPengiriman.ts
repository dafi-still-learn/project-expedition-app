import React from "react";
import baseURL from "../api/Axios";

type PostDataPaketProps = {
  name: string;
  pengirim: string;
  jenis: string;
  jumlah: number;
  asal: string;
  tujuan: string;
  berat: number;
  jalur: string;
  jarak: number;
  nomorHpPengiriman: string;
  nomorHpPenerima: string;
  tanggalPengirimanD: string;
  tanggalSampaiD: string;
  hargaPengirimanD: string;
};

export const postDataPaket = async ({
  name,
  pengirim,
  jenis,
  jumlah,
  asal,
  tujuan,
  berat,
  jalur,
  jarak,
  nomorHpPengiriman,
  nomorHpPenerima,
  tanggalPengirimanD,
  tanggalSampaiD,
  hargaPengirimanD,
}: PostDataPaketProps) => {
  try {
    const response = await baseURL.post(
      "/packet/input_packet",
      {
        nama_paket: name,
        nama_pengirim: pengirim,
        jenis_paket: jenis,
        jumlah_paket: jumlah,
        asal_paket: asal,
        tujuan_paket: tujuan,
        berat_paket: berat,
        jalur_pengiriman: jalur,
        jarak_paket: jarak,
        nomor_hp_pengirim: nomorHpPengiriman,
        nomor_hp_penerima: nomorHpPenerima,
        tanggal_pengiriman: tanggalPengirimanD,
        tanggal_sampai: tanggalSampaiD,
        harga_pengiriman: hargaPengirimanD,
      },
      {
        withCredentials: true,
      },
    );

    console.log("INI ISI RESPONSE DARI PENGIRIMNA PAKET", response);
    return response;
  } catch (err) {
    console.log("TERJADI ERROR KETIKA MENGIRIM DATA PAKET KE BACKEND", err);
  }
};
