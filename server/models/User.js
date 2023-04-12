import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, require: true, unique: true },
    avatar: { public_id: { type: String }, url: { type: String } },
    activated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
