import axios from "axios";

const api = axios.create({
  // Backend prefix v1 thakle seta ekhane add koren
  baseURL: "http://localhost:5000/v1", 
  withCredentials: true, // Cookies handle korar jonno
});

// Request Interceptor: Auto add Token to Headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // useAuthStore ba localStorage theke token nin
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired hole login-e pathate paren
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;