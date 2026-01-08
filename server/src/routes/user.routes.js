import express from "express";
import *as user from '../controllers/user.controller.js'
import protect from "../middlewares/auth.middleware.js";
//import upload from "../middlewares/multer.middleware.js";

const router = express.Router();


router.post("/register", user.signup);
router.post("/login", user.login);

router.get('/profile', protect , user.getProfile);

// /* PROFILE */
// router.get("/profile", authMiddleware, getProfile);
// router.put(
//   "/profile",
//   authMiddleware,
//   upload.single("image"),
//   updateProfile
// );

//  ROLE 
// router.put(
//   "/become-organizer",
//   authMiddleware,
//   changeRoleToOrganizer
// );


export default router;
