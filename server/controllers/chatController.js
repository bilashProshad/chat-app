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

export const createGroupChat = catchAsyncErrors(async (req, res, next) => {
  let { users, name } = req.body;

  if (!users || !name) {
    return next(new ErrorHandler(400, "Fill all the fields"));
  }

  users = JSON.parse(users);

  if (users.length < 2) {
    return next(
      new ErrorHandler(
        400,
        "More than 2 users are required to form a group chat"
      )
    );
  }

  users.push(req.user._id);

  let groupChat = await Chat.create({
    chatName: name,
    isGroupChat: true,
    users,
    groupAdmin: req.user._id,
  });

  groupChat = await Chat.findById(groupChat._id)
    .populate("users")
    .populate("groupAdmin");

  res.status(201).json({ success: true, groupChat });
});

export const renameGroupChat = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { chatName },
    { new: true }
  )
    .populate("users")
    .populate("groupAdmin");

  if (!updatedChat) {
    return next(new ErrorHandler(404, "Chat not found"));
  }

  res.status(200).json({ success: true, updatedChat });
});

export const addUserToGroup = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    id,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users")
    .populate("groupAdmin");

  if (!added) {
    return next(new ErrorHandler(404, "Chat not found"));
  }

  res.status(200).json({ success: true, added });
});

export const removeFromGroup = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    id,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users")
    .populate("groupAdmin");

  if (!removed) {
    return next(new ErrorHandler(404, "Chat not found"));
  }

  res.status(200).json({ success: true, removed });
});
