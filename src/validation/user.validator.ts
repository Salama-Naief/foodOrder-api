import { check, param } from "express-validator";
import { validatorMiddleware } from "../middelwares";
import { BadRequestError } from "../errors";

/**
 * @desc update user validation
 */
export const updateValidator = [
  check("username").optional(),
  check("email").optional().isEmail().withMessage("invalid email formate"),
  check("password").custom(({ val, req }) => {
    delete req.body.password;
    return true;
  }),
  check("role").custom(({ val, req }) => {
    delete req.body.role;
    return true;
  }),
  check("address").optional().isString().withMessage("address must be string"),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("invalid phone number"),
  validatorMiddleware,
];

/**
 * @desc delete user validation
 */

export const deleteUserValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id formate"),
  validatorMiddleware,
];

/**
 * @desc delete user validation
 */

export const getUserValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id formate"),
  validatorMiddleware,
];

/**
 * @desc delete user validation
 */

export const updateRoleValidator = [
  param("id").notEmpty().isMongoId().withMessage("invalid id formate"),
  check("role")
    .notEmpty()
    .withMessage("choose role")
    .custom((role) => {
      const roles = ["user", "manager", "admin"];
      if (!roles.includes(role))
        throw new BadRequestError("choose correct role");
      return true;
    }),
  validatorMiddleware,
];
