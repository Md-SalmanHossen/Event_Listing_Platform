import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events", 
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "fill" }],
  },
});

const upload = multer({ storage });

export default upload;
