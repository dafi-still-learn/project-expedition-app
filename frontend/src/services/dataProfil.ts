import baseURL from "../api/Axios";

export const postDataProfil = async (
  user_id: number,
  email_user: string,
  nama_user: string,
  nama_panggilan: string,
  tanggal_lahir_user: string,
  nomor_hp_user: string,
  alamat_sekarang: string,
  penempatan: string,
  jabatan_sekarang: string,
) => {
  try {
    const response = await baseURL.post(
      "/profil/input_profil",
      {
        user_id: user_id,
        email_user: email_user,
        nama_user: nama_user,
        nama_panggilan: nama_panggilan,
        tanggal_lahir_user: tanggal_lahir_user,
        nomor_hp_user: nomor_hp_user,
        alamat_sekarang: alamat_sekarang,
        penempatan: penempatan,
        jabatan_sekarang: jabatan_sekarang,
      },
      {
        withCredentials: true,
      },
    );

    console.log("INI HASIL RESPONSE DARI PROFIL", response);
    return response;
  } catch (err) {
    console.log("terjadi error pada saat pengiriman profil", err);
  }
};

export const checkProfil = async (user_id: number) => {
  try {
    const response = await baseURL.post(
      "/profil/check_profil",
      {
        user_id: user_id,
      },
      {
        withCredentials: true,
      },
    );

    console.log("ini isi response profil", response.data);
    return response.data;
  } catch (err) {
    console.log("terjadi error pada pengecekkan data profil", err);
  }
};
