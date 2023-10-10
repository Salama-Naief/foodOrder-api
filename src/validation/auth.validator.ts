import { check } from "express-validator";
import { validatorMiddleware } from "../middelwares";

/**
 * @desc create review validation
 */
export const registerValidator = [
  check("username").notEmpty().withMessage("please enter username"),
  check("email")
    .notEmpty()
    .withMessage("enter your email")
    .isEmail()
    .withMessage("invalid email formate"),
  check("password")
    .notEmpty()
    .withMessage("choose the password")
    .isLength({ min: 8 })
    .withMessage("too sort password")
    .isStrongPassword()
    .withMessage(
      "password must contain at least capital char,small char,number,special char"
    ),
  check("address").optional().isString().withMessage("address must be string"),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("invalid phone number"),
  validatorMiddleware,
];

/**
 * @desc create review validation
 */
export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("enter your email")
    .isEmail()
    .withMessage("invalid email formate"),
  check("password")
    .notEmpty()
    .withMessage("choose the password")
    .isLength({ min: 8 })
    .withMessage("too sort password")
    .isStrongPassword()
    .withMessage(
      "password must contain at least capital char,small char,number,special char"
    ),
  validatorMiddleware,
];
