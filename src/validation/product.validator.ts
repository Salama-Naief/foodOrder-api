import { check, param } from "express-validator";
import { validatorMiddleware } from "../middelwares";
import productModel from "../models/product.model";
import { NotFoundError } from "../errors";

/**
 * @desc create product valiation
 */

export const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("you must enter product title")
    .isLength({ min: 3 })
    .withMessage("at least title constian 3 char"),
  check("description")
    .notEmpty()
    .withMessage("please enter product description")
    .isLength({ min: 10 })
    .withMessage("too short"),
  check("price")
    .notEmpty()
    .withMessage("enter the price")
    .isNumeric()
    .withMessage("price must be numeric"),
  check("discount")
    .optional()
    .isNumeric()
    .withMessage("discount must be numeric"),
  check("size").isString().optional(),
  check("specialLevel").isString().optional(),
  check("owner")
    .notEmpty()
    .withMessage("not authorized")
    .isMongoId()
    .withMessage("invalid owner id"),
  check("category")
    .notEmpty()
    .withMessage("product must belong to category")
    .isMongoId()
    .withMessage("invalid category id"),
  check("cuisine")
    .notEmpty()
    .withMessage("product must belong to cuisine")
    .isMongoId()
    .withMessage("invalid cuisine id"),
  check("cover").notEmpty().withMessage("enter product cover image"),
  check("images").optional().isArray().withMessage("images must be array"),
  validatorMiddleware,
];

/**
 * @desc update product valiation
 */

export const updateProductValidator = [
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("at least title constian 3 char"),
  check("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("too short"),
  check("price").optional().isNumeric().withMessage("price must be numeric"),
  check("discount").isNumeric().withMessage("discount must be numeric"),
  check("size").isString().optional(),
  check("specialLevel").isString().optional(),
  check("owner").optional().isMongoId().withMessage("invalid owner id"),
  check("cover").optional(),
  check("images").optional().isArray().withMessage("images must be array"),
  param("id")
    .notEmpty()
    .isMongoId()
    .withMessage("invalid id")
    .custom(async (val, { req }) => {
      const product = await productModel.findById(val);
      if (!product) {
        throw new NotFoundError(`product with id=${val} is not found`);
      }
      return true;
    }),
  validatorMiddleware,
];

/**
 * @desc get product valiation
 */
export const getProductValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

/**
 * @desc delete product valiation
 */
export const deleteProductValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
