import ApiError from "./customError";

export default class UnauthenticatedError extends ApiError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}
