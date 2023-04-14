import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { text, chatId } = req.body;

  if (!text || !chatId) {
    return next(new ErrorHandler(400, "Invalid data passed into request"));
  }

  const newMessage = {
    sender: req.user._id,
    text,
    chat: chatId,
  };

  let message = await Message.create(newMessage);

  await Chat.findByIdAndUpdate(chatId, {
    lastestMessage: message,
  });

  message = await message.populate("sender", "name avatar");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name email avatar",
  });

  res.status(200).json({
    success: true,
    message,
  });
});

export const fetchAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "name email avatar")
    .populate("chat");

  res.json({
    success: true,
    messages,
  });
});
