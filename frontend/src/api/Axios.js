import axios from "axios";

const baseURL = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  withCredentials: true,
});

export default baseURL;
