const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequest(message) {
    return new CustomError(message, StatusCodes.BAD_REQUEST);
  }

  static Unauthenticated(message) {
    return new CustomError(message, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = CustomError;
