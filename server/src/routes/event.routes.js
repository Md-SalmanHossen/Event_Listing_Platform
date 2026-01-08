import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  getOrganizerEvents,
} from "../controllers/event.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);

/* ORGANIZER */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createEvent
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEvent
);

router.get(
  "/organizer/my-events",
  authMiddleware,
  getOrganizerEvents
);

export default router;
