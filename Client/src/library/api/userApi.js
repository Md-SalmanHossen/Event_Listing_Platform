import api from "./axios";

// ✅ Register (NO TOKEN)
export const registerUser = (data) => {
  return api.post("/user/register", data);
};

// ✅ Login (NO TOKEN)
export const loginUser = (data) => {
  return api.post("/user/login", data);
};

// ✅ Get profile (TOKEN REQUIRED)
export const getProfile = () => {
  return api.get("/user/profile");
};

// ✅ Update profile (name + image)
// ❌ Content-Type manually দিও না
export const updateProfile = (formData) => {
  return api.put("/user/profile", formData);
};

// ✅ Become organizer (TOKEN REQUIRED)
export const becomeOrganizer = () => {
  return api.put("/user/become-organizer");
};
