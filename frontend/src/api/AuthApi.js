import baseURL from "./Axios";

// MERESPON DATA DARI BACKEND UNTUK LOGIN DAN REGISTER
export const getDataAccessTokenLogin = async (username, password) => {
  const response = await baseURL.get("/auth/login", {
    params: {
      username,
      password,
    },
    withCredentials: true,
  });
  return response;
};

export const getDataAccessTokenRegister = async (username, email, password) => {
  const response = await baseURL.get("/auth/register", {
    params: {
      username,
      email,
      password,
    },
    withCredentials: true,
  });
  return response;
};

export const validateRole = async (token) => {
  const response = await baseURL.get("/auth/verify_role", {
    params: {
      token,
    },
    withCredentials: true,
  });
  return response;
};
