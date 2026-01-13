import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "events",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "gif", "avif"], // format list barano hoyeche
      resource_type: "auto", // "image" er poriborte "auto" dile sob dhoroner image file support korbe
      // transformation: [{ width: 800, height: 600, crop: "limit" }], 
      // Uporer line-ti comment kora holo jate image original size-ei thake.
    };
  },
});

const fileFilter = (req, file, cb) => {
  // Check kora hocche file-ti asholei image kina
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024 // Akhane 5MB limit set kora hoyeche
  }, 
});

export default upload;