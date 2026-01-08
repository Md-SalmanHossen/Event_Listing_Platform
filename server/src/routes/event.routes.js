import express from "express";
import *as event from "../controllers/event.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

// /* PUBLIC */
// router.get("/", getAllEvents);
// router.get("/:id", getSingleEvent);
router.get('/',event.getAllEvents);

/* ORGANIZER */
router.post('/',protect, upload.single('image'), event.createEvent);



// router.put(
//   "/:id",
//   authMiddleware,
//   upload.single("image"),
//   updateEvent
// );

// router.delete(
//   "/:id",
//   authMiddleware,
//   deleteEvent
// );

// router.get(
//   "/organizer/my-events",
//   authMiddleware,
//   getOrganizerEvents
// );

export default router;
