import express from "express";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
} from "../controllers/review.controller";
import {
  createReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
} from "../validation/review.validator";

const router = express.Router();
router.route("/").post(createReviewValidator, createReview).get(getReviews);
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .delete(deleteReviewValidator, deleteReview);

export default router;
