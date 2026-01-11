import api from "./axios";

// Book ticket
export const bookTicket = (data) => {
  return api.post("/user/ticket/book", data);
};

// User tickets
export const getMyTickets = () => {
  return api.get("/user/ticket/my");
};

// Cancel ticket
export const cancelTicket = (ticketId) => {
  return api.put(`/user/ticket/cancel/${ticketId}`);
};

// Confirm ticket (Organizer)
export const confirmTicket = (ticketId) => {
  return api.put(`/user/ticket/confirmed/${ticketId}`);
};
