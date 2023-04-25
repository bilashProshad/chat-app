import { Box } from "@mui/material";
import Message from "./Message";
import ChatInput from "./ChatInput/ChatInput";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation } from "../redux/actions/messageAction";
import toast from "react-hot-toast";
import { clearConversationError } from "../redux/slices/conversationSlice";
import Loading from "./Loading";
import { myMessage } from "../utils/ChatLogics";

const Conversation = ({ currentChat }) => {
  const { user } = useSelector((state) => state.auth);
  const { conversation, loading, error } = useSelector(
    (state) => state.conversation
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentChat) return;
    dispatch(fetchConversation(currentChat));
  }, [currentChat, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearConversationError());
    }
  }, [error, dispatch]);

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
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} sx={{ width: "100%" }}>
        <ChatInput />
      </Box>
    </Box>
  );
};

export default Conversation;
