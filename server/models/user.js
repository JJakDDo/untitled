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

// Arrow 함수로는 this가 제대로 동작하지 않는다.
// 그래서 일반 함수로 구현한다.
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, userId: this.userId },
    process.env.JWT_SECRET_ACCESS_KEY,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("Users", UserSchema);
