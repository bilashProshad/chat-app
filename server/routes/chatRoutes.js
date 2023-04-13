import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { accessChat, fetchChats } from "../controllers/chatController.js";
const router = express.Router();

router.route("/").post(isAuthenticatedUser, accessChat);
router.route("/").get(isAuthenticatedUser, fetchChats);

export const chatRoutes = router;
