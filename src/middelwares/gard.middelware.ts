import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new UnauthenticatedError("you not loged in!");
  next();
};

//@desc check user permissions (authorization)
export const permissions =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      //@ts-ignore
      if (roles.includes(req.user.role)) {
        next();
      } else {
        throw new UnauthenticatedError("You not allowed to access this route");
      }
    } else {
      throw new UnauthenticatedError("unauthorized ,please login!");
    }
  };

//@desc  admin and the owner can do this
export const userAdminPermissions =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (
      req.user &&
      //@ts-ignore
      (roles.includes(req.user.role) ||
        //@ts-ignore
        req.user.userId.toString() === req.params.id)
    ) {
      next();
    } else {
      throw new UnauthenticatedError("You not allowed to access this route");
    }
  };
