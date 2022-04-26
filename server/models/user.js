const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please provide user ID"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  nickname: {
    type: String,
    required: [true, "Please provide nickname"],
  },
});

UserSchema.methods.createJWT = () => {
  return jwt.sign(
    { id: this._id, userId: this.userId },
    process.env.JWT_SECRET_ACCESS_KEY,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("Users", UserSchema);
