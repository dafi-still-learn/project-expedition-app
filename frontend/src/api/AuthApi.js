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
  const response = await baseURL
    .get("/auth/verify_role", {
      params: {
        token,
      },
      withCredentials: true,
    })
    .then((response) => console.log(response))
    .catch((e) => console.log(e))
    .finally(() => console.log("berhasil di proses"));

  return response;
};
