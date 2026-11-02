import baseURL from "../api/Axios";

export const EstimasiWaktuPengiriman = async ({ jarak, jalur }) => {
  try {
    const response = await baseURL.get(
      `/packet/waktu_pengiriman?jarak=${jarak}&jalur=${jalur}`,
    );

    const data = response.data;

    console.log("ini data estimasi waktu pengiriman dari response ", data);

    return data.data;
  } catch (error) {
    console.error("Error fetching estimasi waktu pengiriman: ", error);
  }
};
