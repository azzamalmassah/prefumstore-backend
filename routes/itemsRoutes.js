import express from "express";
import reviewRouter from "./reviewsRoutes.js";
import { createReview } from "../controllers/reviewsController.js";
import {
  aliasTopTours,
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
} from "../controllers/itemsController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();
router.route("/top-5-cheap").get(aliasTopTours, getAllItems);
router
  .route("/:id")
  .get(protect, restrictTo("admin", "employee"), getItem)
  .delete(protect, restrictTo("admin"), deleteItem)
  .patch(protect, restrictTo("admin", "employee"), updateItem);
router
  .route("/")
  .get(getAllItems)
  .post(protect, restrictTo("admin", "employee"), createItem);

// nested route to create reviews

// router
//   .route("/:itemId/reviews")
//   .post(protect, restrictTo("user"), createReviwe);

router.use("/:itemId/reviews", reviewRouter);

export default router;
