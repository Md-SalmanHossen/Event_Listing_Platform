import api from "./axios";

// Public
export const getAllEvents = () => {
  return api.get("/user/event");
};

export const getSingleEvent = (id) => {
  return api.get(`/user/event/${id}`);
};

// Organizer
export const createEvent = (formData) => {
  return api.post("/user/event", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateEvent = (id, formData) => {
  return api.put(`/user/event/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getOrganizerEvents = () => {
  return api.get("/user/event/organizer/my-event");
};
