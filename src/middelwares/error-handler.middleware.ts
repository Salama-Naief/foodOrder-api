import { NextFunction, Response, Request } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  if (err.name === "TokenExpiredError") {
    customError.msg = "token is expired!";
    customError.statusCode = 404;
  }
  if (err.name === "JsonWebTokenError") {
    customError.msg = "token is invalide!";
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({
    message: customError.msg,
  });
};

export default errorHandlerMiddleware;
