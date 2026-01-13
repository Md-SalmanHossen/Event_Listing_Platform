import api from "./axios";

export const bookTicket = (data) => {
  return api.post("/user/ticket/book", data);
};

export const getMyTickets = () => {
  return api.get("/user/ticket/my");
};

export const cancelTicket = (id) => {
  return api.put(`/user/ticket/cancel/${id}`);
};

export const confirmTicket = (id) => {
  return api.put(`/user/ticket/confirm/${id}`);
};
