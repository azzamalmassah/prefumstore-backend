import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { getAll, createReview } from "../controllers/reviewsController.js";
const router = express.Router({ mergeParams: true });
router.use(protect);
router.route("/").get(getAll).post(restrictTo("user"), createReview);

export default router;
