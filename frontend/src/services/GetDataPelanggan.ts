import baseURL from "../api/Axios";

type GetDataPelangganProps = {
  token: string;
};
// DIGUNKAN UNTUK MENGAMBIL DATA PELANGGAN DARI BACKEND DAN DITAMPILAKAN DI FRONTEND
export const GetDataPelanggan = ({ token }: GetDataPelangganProps) => {
  const handleGetData = async () => {
    try {
      const response = await baseURL.get("/customers/all");

      console.log("data pelanggan", response);
    } catch (err) {
      console.log("terjadi error pada saat pengambilan data");
    }
  };

  if (token) {
    handleGetData();
  }
};
