import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:8000",
  withCredentials: true, // important to send cookies
});

// Response interceptor to handle 401 globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = `/login`;
    }
    return Promise.reject(error);
  }
);

export default api;
