import baseURL from "../api/baseURL";

export const HargaPengiriman = async (berat, jarak, jalur, jenis) => {
  try {
    const response = await baseURL.get(
      `/packet/harga_pengiriman?berat=${berat}&jarak=${jarak}&jalur=${jalur}&jenis=${jenis}`,
    );

    const data = response.data;

    console.log("ini data harga pengiriman dari response ", data);
  } catch (error) {
    console.error("Error fetching harga pengiriman: ", error);
  }
};
