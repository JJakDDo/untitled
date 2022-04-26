const jwt = require("jsonwebtoken");
const CustomError = require("../errors/customError");

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw CustomError.Unauthenticated("Token not provided!");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw CustomError.Unauthenticated("Invalid Authentication");
  }
};

module.exports = authentication;
