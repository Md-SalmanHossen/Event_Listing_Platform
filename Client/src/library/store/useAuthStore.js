import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  login: async (email, password) => {
    try {
      const res = await api.post("/user/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      set({
        user: res.data.user,
        token: res.data.token,
      });

      return true;
    } catch (err) {
      alert("Login failed");
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
