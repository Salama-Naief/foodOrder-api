import { check, param } from "express-validator";
import categoryModel from "../models/category.model";
import { validatorMiddleware } from "../middelwares";

/**
 * @desc create category validation
 */
export const createCategoryValidator = [
  check("name")
    .isString()
    .notEmpty()
    .withMessage("please enter category name")
    .isLength({ min: 3 })
    .withMessage("too short"),
  validatorMiddleware,
];

/**
 * @desc update category validation
 */
export const updateCategoryValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id"),
  check("name")
    .notEmpty()
    .withMessage("please enter category name")
    .isLength({ min: 3 })
    .withMessage("too short")
    .custom(async (val, { req }) => {
      console.log("val", val);
      const category = await categoryModel.findOne({ name: val });
      console.log(category);
      if (category) {
        throw new Error("this name is presarved");
      }
      return true;
    }),
  validatorMiddleware,
];

/**
 * @desc get category validation
 */

export const getCategoryValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

/**
 * @desc delete category validation
 */

export const deleteCategoryValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
