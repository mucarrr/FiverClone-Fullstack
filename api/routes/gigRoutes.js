import express from "express";
import { getGigs, createGig, getGig, updateGig, deleteGig } from "../controllers/gigControllers.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.route("/").get(getGigs).post(protect,createGig);
router.route("/:id").get(getGig).patch(protect,updateGig).delete(protect,deleteGig);

export default router;