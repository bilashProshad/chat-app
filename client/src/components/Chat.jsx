import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getSender } from "../utils/ChatLogics";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../redux/slices/currentChatSlice";

const Chat = ({ chat }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const setCurrentChatHandler = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  const sender = getSender(user, chat.users);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      mb={2}
      p={1}
      borderRadius={2}
      borderBottom={"1px solid #eee"}
      onClick={() => setCurrentChatHandler(chat)}
      sx={{
        cursor: "pointer",
        transition: "all 0.4s",
        "&:hover": {
          backgroundColor: "#9993",
        },
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Avatar alt={sender?.name} src={sender?.avatar?.url} />
        <Box>
          <Typography variant="h6" fontSize={16} fontWeight={"bold"}>
            {sender?.name}
          </Typography>
          <Typography variant="caption">
            {chat?.lastestMessage?.text}
          </Typography>
        </Box>
      </Box>
      <Typography fontSize={12}>1h</Typography>
    </Box>
  );
};

export default Chat;
