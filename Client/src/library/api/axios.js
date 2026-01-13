import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/v1`,
});

// ✅ public routes (token লাগবে না)
const PUBLIC_ROUTES = ["/user/login", "/user/register"];

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const url = config.url || "";

    const isPublic = PUBLIC_ROUTES.some((route) =>
      url.includes(route)
    );

    // ✅ শুধু protected route এ token যাবে
    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
