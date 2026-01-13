import { create } from "zustand";
import api from "../api/axios";

const getInitialUser = () => {
  try {
    const u = localStorage.getItem("user");
    if (!u || u === "undefined") return null;
    return JSON.parse(u);
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getInitialUser(),
  token: localStorage.getItem("token") || null,

  // ✅ NEW: user update helper (role/name/image update হলে কাজে লাগবে)
  setUser: (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    set({ user: newUser });
  },

  login: async (email, password) => {
    try {
      const { data } = await api.post("/user/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      set({ user: data.user, token: data.token });
      return true;
    } catch {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
