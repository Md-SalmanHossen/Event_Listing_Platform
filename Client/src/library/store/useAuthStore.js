import { create } from "zustand";
import api from "../api/axios";

const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getUser(),
  token:
    localStorage.getItem("token") && localStorage.getItem("token") !== "undefined"
      ? localStorage.getItem("token")
      : null,

  login: async (email, password) => {
    const { data } = await api.post("/user/login", { email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    set({ user: data.user, token: data.token });
  },

  register: async (name, email, password) => {
    await api.post("/user/register", { name, email, password });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
