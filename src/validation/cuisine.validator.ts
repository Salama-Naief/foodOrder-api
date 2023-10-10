import { check, param } from "express-validator";
import categoryModel from "../models/category.model";
import { validatorMiddleware } from "../middelwares";

/**
 * @desc create cuisine validation
 */
export const createCuisineValidator = [
  check("name")
    .isString()
    .notEmpty()
    .withMessage("please enter cuisine name")
    .isLength({ min: 3 })
    .withMessage("too short"),
  validatorMiddleware,
];

/**
 * @desc update cuisine validation
 */
export const updateCuisineValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id"),
  check("name")
    .notEmpty()
    .withMessage("please enter cuisine name")
    .isLength({ min: 3 })
    .withMessage("too short")
    .custom(async (val, { req }) => {
      const cuisine = await categoryModel.findOne({ name: val });
      if (cuisine) {
        throw new Error("this name is presarved");
      }
      return true;
    }),
  validatorMiddleware,
];

/**
 * @desc get cuisine validation
 */

export const getCuisineValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

/**
 * @desc delete cuisine validation
 */

export const deleteCuisineValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
