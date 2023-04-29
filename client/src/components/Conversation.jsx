import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Loading from "./Loading";
import { myMessage } from "../utils/ChatLogics";
import Message from "./Message";
import ChatInput from "./ChatInput/ChatInput";
import Lottie from "lottie-react";
import typingAnimation from "../animations/typing.json";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

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
                <Message
                  key={message._id}
                  message={message}
                  self={isMyMessage}
                />
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
