import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  accessChat,
  addUserToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroupChat,
} from "../controllers/chatController.js";
const router = express.Router();

router.route("/").post(isAuthenticatedUser, accessChat);
router.route("/").get(isAuthenticatedUser, fetchChats);
router.route("/group").post(isAuthenticatedUser, createGroupChat);
router.route("/group/:id/rename").put(isAuthenticatedUser, renameGroupChat);
router.route("/group/:id/add").put(isAuthenticatedUser, addUserToGroup);
router.route("/group/:id/remove").put(isAuthenticatedUser, removeFromGroup);

export const chatRoutes = router;
