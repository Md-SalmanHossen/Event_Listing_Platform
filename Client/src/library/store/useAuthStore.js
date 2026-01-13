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

  setUser: (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    set({ user: newUser });
  },

  register: async (name, email, password) => {
    try {
      await api.post("/user/register", { name, email, password });
      return { success: true };
    } catch (err) {
      // axios interceptor থাকলে err string হবে
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || err?.message || "Register failed";
      return { success: false, error: msg };
    }
  },

  login: async (email, password) => {
    try {
      const { data } = await api.post("/user/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      set({ user: data.user, token: data.token });

      return { success: true };
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || err?.message || "Login failed";
      return { success: false, error: msg };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
