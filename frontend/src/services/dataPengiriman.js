import baseURL from "../api/Axios";

export const postDataPacket = async (
  nama_paket,
  nama_pengirim,
  jenis_paket,
  jumlah_paket,
  asal_paket,
  tujuan_paket,
  berat_paket,
  jalur_pengiriman,
  nomor_hp_pengirim,
  nomor_hp_penerima,
) => {
  try {
    const response = await baseURL.post(
      "/packet/input_packet",
      {
        nama_packet: nama_paket,
        nama_pengirim: nama_pengirim,
        jenis_paket: jenis_paket,
        jumlah_paket: jumlah_paket,
        asal_paket: asal_paket,
        tujuan_paket: tujuan_paket,
        berat_paket: berat_paket,
        jalur_pengiriman: jalur_pengiriman,
        nomor_hp_pengirim: nomor_hp_pengirim,
        nomor_hp_penerima: nomor_hp_penerima,
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
