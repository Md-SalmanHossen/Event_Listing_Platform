import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/v1`,
});

const PUBLIC_ROUTES = ["/user/login", "/user/register"];

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const url = config.url || "";

    const isPublic = PUBLIC_ROUTES.some((route) =>
      url.includes(route)
    );

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
