import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changeRoleToOrganizer,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

/* AUTH */
router.post("/register", registerUser);
router.post("/login", loginUser);

/* PROFILE */
router.get("/profile", authMiddleware, getProfile);
router.put(
  "/profile",
  authMiddleware,
  upload.single("image"),
  updateProfile
);

/* ROLE */
router.put(
  "/become-organizer",
  authMiddleware,
  changeRoleToOrganizer
);

export default router;
