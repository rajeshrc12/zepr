import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:8000",
  withCredentials: true, // important to send cookies
});

export default api;
