import { Request, Response } from "express";
import userModel, { IUser } from "../models/user.model";
import { deleteOne, getAll, getOne, updateOne } from "./factory-handler";
import { BadRequestError, NotFoundError } from "../errors";

/**
 *
 * @desc    get users
 * @route   GET/api/users
 * @role    admin-manager
 */
export const getUsers = getAll(userModel);

/**
 *
 * @desc    get user
 * @route   get/api/users/:id
 * @role    admin,manager
 */
export const getUser = getOne(userModel);

// /**
//  *
//  * @desc    update user
//  * @route   PUT/api/users/:id
//  * @role    admin,manager,user it self
//  */
export const updateUser = updateOne(userModel);

/**
 *
 * @desc    delete user
 * @route   DELETE/api/users/:id
 * @role    admin-manager-user it self
 */
export const deleteUser = deleteOne(userModel);

/**
 *
 * @desc    get me
 * @route   DELETE/api/users/me
 * @role    it self
 */
export const getMe = async (req: Request, res: Response): Promise<any> => {
  if (!req.user) {
    throw new BadRequestError("you must be login");
  }
  res.status(200).json(req.user);
};

/**
 *
 * @desc    update role
 * @route   PATCH/api/users/role/:id
 * @role    admin
 */
export const updateRole = async (req: Request, res: Response): Promise<any> => {
  const { role } = req.body;
  const { id } = req.params;
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) throw new NotFoundError(`user with id=${id} is not found!`);
  res.status(200).json(user);
};
