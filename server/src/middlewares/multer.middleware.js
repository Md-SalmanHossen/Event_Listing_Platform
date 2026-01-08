import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config.js"; // note: configs folder, plural

// Cloudinary storage settings
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events", // events or users folder separate rakhte paro
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "fill" }],
  },
});

// Multer upload instance
const upload = multer({ storage });

export default upload;
