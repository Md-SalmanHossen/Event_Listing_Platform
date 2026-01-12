import api from "./axios";

export const bookTicket = (data) => api.post("/user/ticket/book", data);

export const getMyTickets = () => api.get("/user/ticket/my");

export const cancelTicket = (ticketId) =>
  api.put(`/user/ticket/cancel/${ticketId}`);

export const confirmTicket = (ticketId) =>
  api.put(`/user/ticket/confirm/${ticketId}`);
