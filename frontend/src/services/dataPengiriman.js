import baseURL from "../api/Axios";

export const postDataPacket = async (
  nama_paket,
  jenis_paket,
  jumlah_paket,
  asal_paket,
  tujuan_paket,
  berat_paket,
  jalur_pengiriman,
) => {
  try {
    const response = await baseURL.post(
      "/packet/input_packet",
      {
        nama_packet: nama_paket,
        jenis_paket: jenis_paket,
        jumlah_paket: jumlah_paket,
        asal_paket: asal_paket,
        tujuan_paket: tujuan_paket,
        berat_paket: berat_paket,
        jalur_pengiriman: jalur_pengiriman,
      },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (err) {
    console.log("TERJADI ERROR KETIKA MENGIRIM DATA PAKET KE BACKEND", err);
  }
};
