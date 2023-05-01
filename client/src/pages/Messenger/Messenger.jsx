import { Box, Typography } from "@mui/material";
import Layout from "../../components/Layout";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../redux/actions/chatAction";
import toast from "react-hot-toast";
import { clearFetchAllChatError } from "../../redux/slices/chatsSlice";
import Conversation from "../../components/Conversation";
import Chats from "../../components/Chats";
import ChatTopBar from "../../components/ChatTopBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  fetchConversation,
  sendMessage,
} from "../../redux/actions/messageAction";
import { setNotification } from "../../redux/slices/notificationSlice";
import {
  clearConversationError,
  updateConversation,
} from "../../redux/slices/conversationSlice";
import { clearSendMessageError } from "../../redux/slices/messageSlice";
import io from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_APP_SERVER;

const Messenger = () => {
  const { chats, loading, error } = useSelector((state) => state.chats);
  const { currentChat } = useSelector((state) => state.currentChat);

  const matches = useMediaQuery("(max-width:768px)");

  const dispatch = useDispatch();
  const socket = useRef(null);
  const [selectedChatCompare, setSelectedChatCompare] = useState(null);

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const {
    conversation,
    loading: convLoading,
    error: convError,
  } = useSelector((state) => state.conversation);
  const { message, error: messageError } = useSelector(
    (state) => state.message
  );
  const { notification } = useSelector((state) => state.notification);

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("setup", user);
    socket.current.on("connected", () => setSocketConnected(true));
    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stop typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    if (!currentChat._id) return;
    dispatch(fetchConversation(currentChat._id));

    socket.current.emit("join chat", currentChat._id);

    // console.log(selectedChatCompare.current);
    setSelectedChatCompare(currentChat);
  }, [currentChat, dispatch]);

  useEffect(() => {
    socket.current
      .off("message received")
      .on("message received", (newMessageReceived) => {
        if (!currentChat || currentChat._id !== newMessageReceived.chat._id) {
          // give notification

          if (!notification.find((n) => n._id === newMessageReceived._id)) {
            dispatch(fetchChats());
            dispatch(setNotification(newMessageReceived));
          }
        } else {
          dispatch(updateConversation(newMessageReceived));
        }
      });
  }, [socket, dispatch, notification, selectedChatCompare, currentChat]);

  useEffect(() => {
    if (message._id) {
      dispatch(updateConversation(message));
    }
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

    if (convError) {
      toast.error(convError);
      dispatch(clearConversationError());
    }
  }, [error, dispatch, messageError, convError]);

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

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearFetchAllChatError());
    }
  }, [error, dispatch]);

  return (
    <>
      <Layout>
        {/* <Container maxWidth={"xl"}> */}
        <Box
          display={"flex"}
          height={"calc(100svh - 4.3rem)"}
          // overflow={"hidden"}
        >
          {matches && !currentChat._id && (
            <Chats chats={chats} loading={loading} />
          )}
          {!matches && <Chats chats={chats} loading={loading} />}
          {/* ------- right ------- */}
          {!matches && (
            <>
              <Box flex={1} borderRight={"1px solid #eee"} height={"100%"}>
                {currentChat._id && (
                  <>
                    <ChatTopBar currentChat={currentChat} />

                    {/* =========== Conversation =========== */}
                    <Conversation
                      currentChat={currentChat}
                      loading={convLoading}
                      isTyping={isTyping}
                      text={text}
                      typingHandler={typingHandler}
                      onSubmitHandler={onSubmitHandler}
                      conversation={conversation}
                    />
                  </>
                )}
                {!currentChat._id && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"80%"}
                  >
                    <Typography
                      textAlign={"center"}
                      component={"p"}
                      variant="h5"
                      color={"GrayText"}
                    >
                      Select a chat to start conversation
                    </Typography>
                  </Box>
                )}
              </Box>
            </>
          )}
          {matches && currentChat._id && (
            <>
              <Box flex={1} borderRight={"1px solid #eee"} height={"100%"}>
                {currentChat._id && (
                  <>
                    <ChatTopBar currentChat={currentChat} />

                    {/* =========== Conversation =========== */}
                    <Conversation
                      currentChat={currentChat}
                      loading={convLoading}
                      isTyping={isTyping}
                      text={text}
                      typingHandler={typingHandler}
                      onSubmitHandler={onSubmitHandler}
                      conversation={conversation}
                    />
                  </>
                )}
                {!currentChat._id && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"80%"}
                  >
                    <Typography
                      textAlign={"center"}
                      component={"p"}
                      variant="h5"
                      color={"GrayText"}
                    >
                      Select a chat to start conversation
                    </Typography>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
        {/* </Container> */}
      </Layout>
    </>
  );
};

export default Messenger;
