import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  resizeImages,
  updateProduct,
  uploadImages,
} from "../controllers/product.controller";
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from "../validation/product.validator";

const router = express.Router();
router
  .route("/")
  //@ts-ignore
  .post(uploadImages, resizeImages, createProductValidator, createProduct)
  .get(getProducts);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
