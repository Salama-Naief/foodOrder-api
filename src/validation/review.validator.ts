import { check, param } from "express-validator";
import { validatorMiddleware } from "../middelwares";
import userModel from "../models/user.model";
import { NotFoundError } from "../errors";
import productModel from "../models/product.model";

/**
 * @desc create review validation
 */
export const createReviewValidator = [
  check("message")
    .isString()
    .notEmpty()
    .withMessage("please enter review message"),
  check("user")
    .notEmpty()
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (userId) => {
      const user = await userModel.findById(userId);
      if (!user) {
        throw new NotFoundError("user not found");
      }
      return true;
    }),
  check("product")
    .notEmpty()
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (productId) => {
      const product = await productModel.findById(productId);
      if (!product) {
        throw new NotFoundError("product not found");
      }
      return true;
    }),
  validatorMiddleware,
];

/**
 * @desc get review validation
 */

export const getReviewValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id formate"),
  validatorMiddleware,
];

/**
 * @desc delete review validation
 */

export const deleteReviewValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id formate"),
  validatorMiddleware,
];
