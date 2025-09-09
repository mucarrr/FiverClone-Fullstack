import express from "express";
import { register, login, logout, forgotPassword } from "../controllers/authControllers.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("photo"),register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);

export default router;