import customError from "./customError";

export default class BadRequest extends customError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
