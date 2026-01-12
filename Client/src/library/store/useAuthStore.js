import { create } from "zustand";
import api from "../api/axios";

// LocalStorage theke user data niye ashar helper function
const getInitialUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getInitialUser(),
  token: localStorage.getItem("token") || null,

  // Login Function
  login: async (email, password) => {
    try {
      // "/v1" ekhane likhar dorkar nai, axios.js e deya ache
      const { data } = await api.post("/user/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      set({ user: data.user, token: data.token });
      return { success: true };
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message };
    }
  },

  // Register Function
  register: async (name, email, password) => {
    try {
      await api.post("/user/register", { name, email, password });
      return { success: true };
    } catch (error) {
      console.error("Register Error:", error.response?.data?.message);
      return { success: false, error: error.response?.data?.message };
    }
  },

  // Logout Function
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;