import api from "./axios";

export const registerUser = (data) => {
  return api.post("/user/register", data);
};

export const loginUser = (data) => {
  return api.post("/user/login", data);
};

export const getProfile = () => {
  return api.get("/user/profile");
};

export const updateProfile = (formData) => {
  return api.put("/user/profile", formData);
};

export const becomeOrganizer = () => {
  return api.put("/user/become-organizer");
};
