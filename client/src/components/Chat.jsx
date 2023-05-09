import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getSender } from "../utils/ChatLogics";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../redux/slices/currentChatSlice";

const Chat = ({ chat }) => {
  const { user } = useSelector((state) => state.auth);
  const { currentChat } = useSelector((state) => state.currentChat);

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
          backgroundColor: currentChat._id === chat._id ? "" : "#9993",
        },
        backgroundColor: currentChat._id === chat._id ? "#1E71FF" : "",
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        {chat.isGroupChat ? (
          // <AvatarGroup max={2} spacing={30}>
          //   {chat.users.map((user) => (
          //     <Avatar key={user._id} alt={user?.name} src={user?.avatar?.url} />
          //   ))}
          // </AvatarGroup>
          <Avatar>{chat.chatName[0]}</Avatar>
        ) : (
          <Avatar alt={sender.name} src={sender?.avatar?.url} />
        )}
        <Box color={currentChat._id === chat._id ? "#fff" : ""}>
          <Typography variant="h6" fontSize={16} fontWeight={"bold"}>
            {chat.isGroupChat ? chat.chatName : sender?.name}
          </Typography>
          <Typography variant="caption">
            {chat?.lastestMessage?.text}
          </Typography>
        </Box>
      </Box>
      <Typography
        fontSize={12}
        color={currentChat._id === chat._id ? "#fff" : ""}
      >
        1h
      </Typography>
    </Box>
  );
};

export default Chat;
