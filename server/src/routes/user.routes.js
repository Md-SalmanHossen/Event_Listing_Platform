import express from "express";
import *as user from '../controllers/user.controller.js'
import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();


router.post("/register", user.signup);
router.post("/login", user.login);

router.get('/profile', protect , user.getProfile);

router.put('/profile', protect, upload.single('image') ,user.updateProfileImage)
router.put('/become-organizer', protect, user.roleToOrganizer);


export default router;
