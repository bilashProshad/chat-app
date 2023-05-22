import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { generateOtp, hashOtp, validateOtp } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";
import cloudinary from "cloudinary";

export const sendOtp = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler(400, "Email field is required!"));
  }

  const otp = await generateOtp();

  // hash
  const ttl = 1000 * 60 * 3; // 3 min
  const expires = Date.now() + ttl;
  const data = `${email}#${otp}#${expires}`;
  const hash = hashOtp(data);

  await sendEmail({
    email,
    subject: "Chat App OTP",
    message: `Your chat-app OTP is ${otp}`,
  });

  res.status(200).json({ hash: `${hash}.${expires}`, email });
});

export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
  const { otp, hash, email } = req.body;

  if (!otp || !hash || !email) {
    return next(new ErrorHandler(400, "All fields are required!"));
  }

  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > +expires) {
    return next(new ErrorHandler(400, "OTP expired!"));
  }

  const data = `${email}#${otp}#${expires}`;
  const isValidOtp = validateOtp(hashedOtp, data);

  if (!isValidOtp) {
    return next(new ErrorHandler(400, "Invalid OTP!"));
  }

  let user;

  user = await User.findOne({ email }).select("name email activated avatar");

  if (!user) {
    user = await User.create({ email });
    user = await User.findById(user._id).select("name email activated avatar");
  }

  const token = user.getJWT();

  const options = {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV === "development" ? false : "none",
    expires: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRE
    ),
  };

  res.cookie("token", token, options).json({ success: true, user, auth: true });
});

export const activate = catchAsyncErrors(async (req, res, next) => {
  const { name, avatar } = req.body;

  if (!name) {
    return next(new ErrorHandler(400, "Name field is required!"));
  }

  let user = await User.findById(req.user._id).select(
    "name email activated avatar"
  );
  user.name = name;
  user.activated = true;

  if (avatar) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "chat-app/profile-picture",
      width: 250,
      crop: "scale",
    });

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await user.save();

  res.status(200).json({ success: true, user, auth: true });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ success: true, user, auth: true });
});

export const allUsers = catchAsyncErrors(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });

  res.status(200).json({
    success: true,
    users,
  });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    user: null,
    auth: false,
    message: "Successfully logged out",
  });
});
