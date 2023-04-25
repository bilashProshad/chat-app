import { Avatar, Box, Button, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { getSender } from "../utils/ChatLogics";
import { useSelector } from "react-redux";

const ChatTopBar = ({ currentChat }) => {
  const { user } = useSelector((state) => state.auth);

  const sender = getSender(user, currentChat.users);

  return (
    <Box
      padding={2}
      // sx={{ borderBottom: "1px solid #eee" }}
      boxShadow={"3px 3px 5px rgba(0,0,0,0.1)"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={"#fff"}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Avatar
          alt={sender.name}
          src={sender?.avatar?.url}
          sx={{ width: "32px", height: "32px" }}
        />
        <Typography fontWeight={"bold"}>{sender.name}</Typography>
      </Box>
      <Box>
        <Button>
          <InfoIcon fontSize="medium" />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatTopBar;
