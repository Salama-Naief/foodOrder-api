import customError from "./customError";

export default class NotFound extends customError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}
