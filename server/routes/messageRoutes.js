import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  fetchAllMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.route("/").post(isAuthenticatedUser, sendMessage);
router.route("/:chatId").get(isAuthenticatedUser, fetchAllMessages);

export const messageRoutes = router;
