import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Chat } from "../models/Chat.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const accessChat = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return next(
      new ErrorHandler(400, "You cannot access chat without select a user")
    );
  }

  let chat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "name email avatar")
    .populate("lastestMessage");

  chat = await User.populate(chat, {
    path: "lastestMessage.sender",
    select: "name email avatar",
  });

  if (chat) {
    return res.status(200).json({
      success: true,
      chat,
    });
  }

  const chatData = {
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  };

  const createdChat = await Chat.create(chatData);

  chat = await Chat.findById(createdChat._id).populate(
    "users",
    "name email avatar"
  );

  res.status(201).json({ success: true, chat });
});

export const fetchChats = catchAsyncErrors(async (req, res, next) => {
  let chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users", "name email avatar")
    .populate("groupAdmin", "name email avatar")
    .populate("lastestMessage")
    .sort({ updatedAt: -1 });

  chats = await User.populate(chats, {
    path: "lastestMessage.sender",
    select: "name email avatar",
  });

  res.status(200).json({ success: true, chats });
});
