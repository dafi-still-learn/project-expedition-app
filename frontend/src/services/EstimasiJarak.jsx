import baseURL from "../api/Axios";

export const EstimasiJarak = async ({ asal, tujuan, setJarakD }) => {
  try {
    const response = await baseURL.get(
      `/packet/jarak_pengiriman?asal=${asal}&tujuan=${tujuan}`,
    );

    const data = response.data;

    console.log("ini data estimasi jarak dari response ", data);

    setJarakD(data.data);
  } catch (error) {
    console.error("Error fetching estimasi jarak: ", error);
  }
};
