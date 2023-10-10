import express from "express";
import {
  createCuisine,
  deleteCuisine,
  getCuisine,
  getCuisines,
  updateCuisine,
} from "../controllers/cuisine.controller";
import {
  createCuisineValidator,
  deleteCuisineValidator,
  getCuisineValidator,
  updateCuisineValidator,
} from "../validation/cuisine.validator";

const router = express.Router();
router.route("/").post(createCuisineValidator, createCuisine).get(getCuisines);
router
  .route("/:id")
  .get(getCuisineValidator, getCuisine)
  .put(updateCuisineValidator, updateCuisine)
  .delete(deleteCuisineValidator, deleteCuisine);

export default router;
