import { Box } from "@mui/material";
import Message from "./Message";
import ChatInput from "./ChatInput/ChatInput";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation } from "../redux/actions/messageAction";
import toast from "react-hot-toast";
import {
  clearConversationError,
  updateConversation,
} from "../redux/slices/conversationSlice";
import Loading from "./Loading";
import { myMessage } from "../utils/ChatLogics";
import { clearSendMessageError } from "../redux/slices/messageSlice";
import { sendMessage } from "../redux/actions/messageAction";
import io from "socket.io-client";
import Lottie from "lottie-react";
import typingAnimation from "../animations/typing.json";

const ENDPOINT = import.meta.env.VITE_APP_SERVER;

const Conversation = ({ currentChat }) => {
  const socket = useRef(null);
  const selectedChatCompare = useRef();
  const bottomRef = useRef(null);

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { conversation, loading, error } = useSelector(
    (state) => state.conversation
  );
  const { message, error: messageError } = useSelector(
    (state) => state.message
  );

  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("setup", user);
    socket.current.on("connected", () => setSocketConnected(true));
    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stop typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    if (!currentChat) return;
    dispatch(fetchConversation(currentChat._id));

    socket.current.emit("join chat", currentChat._id);

    selectedChatCompare.current = currentChat;
    // console.log(selectedChatCompare.current);
  }, [currentChat, dispatch]);

  useEffect(() => {
    socket.current.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare.current ||
        selectedChatCompare.current._id !== newMessageReceived.chat._id
      ) {
        // give notification
      } else {
        dispatch(updateConversation(newMessageReceived));
      }
    });
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(updateConversation(message));
    if (message && message.chat && message.chat.users.length > 0) {
      socket.current.emit("new message", message);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearConversationError());
    }

    if (messageError) {
      toast.error(messageError);
      dispatch(clearSendMessageError());
    }
  }, [error, dispatch, messageError]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!text) return;

    dispatch(sendMessage({ text, chatId: currentChat._id }));

    socket.current.emit("stop typing", currentChat._id);

    setText("");
  };

  const typingHandler = (e) => {
    setText(e.target.value);

    // Typing Indicator Logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", currentChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.current.emit("stop typing", currentChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <Box
      height={"90%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      // sx={{ backgroundColor: "#eee" }}
    >
      {/* =========== Conversation ============= */}
      <Box
        sx={{ width: "100%" }}
        padding={3}
        // display={"flex"}
        // flexDirection={"column"}
        overflow={"auto"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={"60rem"}
          marginLeft={"auto"}
          marginRight={"auto"}
          gap={1}
          position={"relative"}
        >
          {loading && <Loading />}
          {!loading &&
            conversation.length > 0 &&
            conversation.map((message) => {
              const isMyMessage = myMessage(user._id, message.sender._id);

              return (
                <>
                  <Message
                    key={message._id}
                    message={message}
                    self={isMyMessage}
                  />
                </>
              );
            })}

          {isTyping && (
            <div
              style={{
                width: "100px",
                position: "absolute",
                left: "-30px",
                bottom: "-50px",
              }}
            >
              <Lottie animationData={typingAnimation} loop={true} />
            </div>
          )}
          <div ref={bottomRef} />
        </Box>
      </Box>

      <Box display={"flex"} alignItems={"center"} sx={{ width: "100%" }}>
        <ChatInput
          value={text}
          onChange={typingHandler}
          onSubmit={onSubmitHandler}
        />
      </Box>
    </Box>
  );
};

export default Conversation;
