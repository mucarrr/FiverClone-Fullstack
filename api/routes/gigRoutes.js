import express from "express";
import { getGigs, createGig, getGig, updateGig, deleteGig } from "../controllers/gigControllers.js";
import { protect } from "../middlewares/protect.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").get(getGigs).post(protect, upload.fields([{name: "coverImage", maxCount: 1}, {name: "images", maxCount: 6}]), createGig);
router.route("/:id").get(getGig).patch(protect, upload.fields([{name: "coverImage", maxCount: 1}, {name: "images", maxCount: 6}]), updateGig).delete(protect,deleteGig);

export default router;