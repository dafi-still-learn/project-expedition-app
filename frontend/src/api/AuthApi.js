import baseURL from "./Axios";

// MERESPON DATA DARI BACKEND UNTUK LOGIN DAN REGISTER
export const LoginOperator = async (username, password) => {
  try {
    const response = await baseURL.post(
      "/auth/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (err) {
    console.log("terjadi eror", err);
  }
};

export const RegisterOperator = async (email, username, password) => {
  try {
    const response = await baseURL.post(
      "/auth/register",
      {
        email: email,
        username: username,
        password: password,
        role: "OPERATOR",
      },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (err) {
    console.log("terjadi error pada", err);
  }
};

export const validateRole = async (token) => {
  try {
    const response = await baseURL.post(
      "/auth/verify_role",
      {
        token,
      },
      {
        withCredentials: true,
      },
    );

    return response;
  } catch (err) {
    console.log("terjadi error pada pengiriman axios validateRole", err);
  }
};

export const getAccessTokenRefresh = async () => {
  // INI SUDAH AMAN DAN SUDAH MENGEMBALIKAN TOKEN SEBENARNYA

  try {
    const response = await baseURL.post("/auth/refresh_token", {
      withCredentials: true,
    });

    console.log(
      "ini isi dari response get access token refresh",
      response.data.access_token,
    );

    return response.data.access_token;
  } catch (err) {
    console.log(
      "terjadi error pada saat refresh halaman dan backend tidak dapat menyampaikan data ke frontend",
      err,
    );
  }
};
