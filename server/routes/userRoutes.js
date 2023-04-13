import express from "express";
import {
  activate,
  logout,
  sendOtp,
  verifyOtp,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/activate").post(isAuthenticatedUser, activate);
router.route("/logout").get(logout);

export const userRoutes = router;
