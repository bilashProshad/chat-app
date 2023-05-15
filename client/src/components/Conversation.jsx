import { Avatar, Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Loading from "./Loading";
import { isLastMessage, isSameSender, myMessage } from "../utils/ChatLogics";
import Message from "./Message";
import ChatInput from "./ChatInput/ChatInput";
import Lottie from "lottie-react";
import typingAnimation from "../animations/typing.json";
import { useSelector } from "react-redux";
import { getSender } from "../utils/ChatLogics";

const Conversation = ({
  loading,
  conversation = [],
  isTyping,
  text,
  typingHandler,
  onSubmitHandler,
}) => {
  const bottomRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { currentChat } = useSelector((state) => state.currentChat);

  const matches = useMediaQuery("(max-width:768px)");
  const sender = getSender(user, currentChat.users);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <Box
      height={matches ? "100%" : "90%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingBottom={matches ? "0" : "1rem"}
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
            conversation.map((message, i) => {
              const isMyMessage = myMessage(user._id, message.sender._id);
              const sameSender = isSameSender(
                conversation,
                message,
                i,
                user._id
              );
              const lastMessage = isLastMessage(conversation, i, user._id);

              return (
                <Message
                  key={message._id}
                  message={message}
                  self={isMyMessage}
                  isSameSender={sameSender}
                  isLastMessage={lastMessage}
                />
              );
            })}

          {isTyping && (
            <>
              <Box display={"flex"} alignItems={"center"} maxHeight={"2.5rem"}>
                {currentChat.isGroupChat ? (
                  <>
                    <Avatar>{currentChat.chatName} </Avatar>
                  </>
                ) : (
                  <Avatar alt={sender.name} src={sender?.avatar?.url} />
                )}
                <Lottie animationData={typingAnimation} loop={true} />
              </Box>
            </>
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
