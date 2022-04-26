const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(404).send("No Token");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY);
    console.log(payload);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    return res.status(404).send("Token not authenticated");
  }
};

module.exports = authentication;
