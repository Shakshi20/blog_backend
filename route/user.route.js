import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js"; 

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUser);

export default router;