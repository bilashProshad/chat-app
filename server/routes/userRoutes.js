import express from "express";
import {
  activate,
  getUserDetails,
  logout,
  sendOtp,
  verifyOtp,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/activate").post(isAuthenticatedUser, activate);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/logout").get(logout);

export const userRoutes = router;
