const CustomError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong" });
};

module.exports = errorHandler;
