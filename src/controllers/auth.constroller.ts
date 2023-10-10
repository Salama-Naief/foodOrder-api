import { Request, Response } from "express";
import localUserModel from "../models/local-user.model";
import { createOne } from "./factory-handler";
import { IUser } from "../models/user.model";
import { BadRequestError } from "../errors";

/**
 *
 * @desc    create new user
 * @route   POST/api/auth/register
 * @role    public
 */
export const register = async (req: Request, res: Response) => {
  const newUser = await localUserModel.create(req.body);
  //@ts-ignore
  delete newUser._doc.password;
  res.status(201).json(newUser);
};

/**
 *
 * @desc    login
 * @route   POST/api/auth/login
 * @role    public
 */
export const login = async (req: Request, res: Response) => {};

/**
 *
 * @desc    login
 * @route   POST/api/auth/login
 * @role    public
 */
export const authError = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new BadRequestError("email or password is not correct");
  }
  res.status(200).json({ userId: req.user });
};
