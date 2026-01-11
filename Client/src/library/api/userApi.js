import api from "./axios";

// Register
export const registerUser = (data) => {
  return api.post("/user/register", data);
};

// Login
export const loginUser = (data) => {
  return api.post("/user/login", data);
};

// Get profile
export const getProfile = () => {
  return api.get("/user/profile");
};

// Update profile image
export const updateProfileImage = (formData) => {
  return api.put("/user/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Become organizer
export const becomeOrganizer = () => {
  return api.put("/user/become-organizer");
};
