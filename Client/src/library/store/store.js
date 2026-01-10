import { create } from "zustand";
import API from "../api/api";

// খুব সহজ check function
const getUser = () => {
  const user = localStorage.getItem("user");

  // যদি কিছুই না থাকে
  if (!user || user === "undefined") {
    return null;
  }

  // থাকলে JSON এ convert
  return JSON.parse(user);
};

const useAuthStore = create((set) => ({
  user: getUser(),
  token:
    localStorage.getItem("token") &&
    localStorage.getItem("token") !== "undefined"
      ? localStorage.getItem("token")
      : null,

  login: async (email, password) => {
    const { data } = await API.post("/user/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    set({
      user: data.user,
      token: data.token,
    });
  },

  register: async (name, email, password) => {
    await API.post("/user/register", {
      name,
      email,
      password,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });
  },
}));

export default useAuthStore;
