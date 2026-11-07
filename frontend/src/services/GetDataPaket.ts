import baseURL from "../api/Axios";

type GetDataPaketProps = {
  token: string;
};

// DIGUNAKAN UNTUK MENGAMBIL DATA PELANGGAN DARI BACKEND DAN DITAMPILKAN DI FRONTEND
export const GetDataPelanggan = ({ token }: GetDataPaketProps) => {
  const handleGetData = async () => {
    try {
      const response = await baseURL.get("/paket/all");

      console.log("data pelanggan", response);
    } catch (err) {
      console.log("terjadi error pada saat pengambilan data");
    }
  };

  if (token) {
    handleGetData();
  }
};
