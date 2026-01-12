import express from "express";
import *as event from "../controllers/event.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get('/',event.getAllEvents);

/* ORGANIZER */
router.get('/organizer/my-event', protect, event.getOrganizerEvents)

router.post('/',protect, upload.single('image'), event.createEvent);
router.put('/:id',protect ,upload.single('image'), event.updateEvent);
router.delete('/:id',protect,event.deleteEvent);

router.get('/:id',event.getSingleEvent)


export default router;
