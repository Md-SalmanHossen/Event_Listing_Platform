import axios from "axios";

// Backend URL (frontend .env এ VITE_API_URL সেট করো)
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/v1`,
});

// Token auto add (Bearer)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Simple error handling (message clean করে দেয়)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";

    return Promise.reject(message);
  }
);

export default api;
