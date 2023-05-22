import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { userRoutes } from "./routes/userRoutes.js";
import cloudinary from "cloudinary";
import { chatRoutes } from "./routes/chatRoutes.js";
import { messageRoutes } from "./routes/messageRoutes.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

dotenv.config();

const server = createServer(app);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectDatabase();

const corsOption = {
  credentials: true,
  origin: [process.env.FRONT_END_URL],
};
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.get("/", (req, res) => {
  res.send("Welcome to chat app");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

app.use(errorMiddleware);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONT_END_URL,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room:", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) {
      return console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {
      // if logged user and sender is same, then it'll return
      if (user._id == newMessageReceived.sender._id) return;

      // "in" means inside that user's room, emit/send that message
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
