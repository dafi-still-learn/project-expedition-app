const VITE_API_BACKEND = import.meta.env.VITE_API_BACKEND;

export async function sendDataPengiriman(
  nama,
  jenis,
  jumlah,
  asal,
  tujuan,
  berat,
  mitra,
) {
  const response = await fetch(`${VITE_API_BACKEND}/data_pengiriman`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama_paket: nama,
      jenis_paket: jenis,
      jumlah_paket: jumlah,
      asal_paket: asal,
      tujuan_paket: tujuan,
      berat_paket: berat,
      mitra_pengiriman: mitra,
    }),
  });

  const result = await response.json();

  if (!result.ok) {
    throw new Error("data gagal dikirim ke database paket");
  }

  return await result;
}
