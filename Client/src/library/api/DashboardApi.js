import api from "./axios";

// User dashboard
export const getUserDashboard = () => {
  return api.get("/dashboard/user");
};

// Organizer dashboard
export const getOrganizerDashboard = () => {
  return api.get("/dashboard/organizer");
};
