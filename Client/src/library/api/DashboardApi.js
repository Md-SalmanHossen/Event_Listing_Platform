import api from "./axios";

export const getUserDashboard = () => {
  return api.get("/dashboard/user");
};

export const getOrganizerDashboard = () => {
  return api.get("/dashboard/organizer");
};
