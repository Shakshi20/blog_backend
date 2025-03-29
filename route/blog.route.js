import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controller/blog.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.post("/", upload.single("image"), protect, createBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
