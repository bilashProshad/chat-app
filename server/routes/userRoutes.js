import express from "express";
import {
  activate,
  logout,
  sendOtp,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/activate").post(activate);
router.route("/logout").get(logout);

export const userRoutes = router;
