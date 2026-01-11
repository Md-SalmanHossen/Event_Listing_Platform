import api from "./axios";

export const getOrganizerTickets = () => {
  return api.get("/organizer/tickets");
};
