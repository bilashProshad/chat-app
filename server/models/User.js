import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, require: true, unique: true },
    avatar: { public_id: { type: String }, url: { type: String } },
    activated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
