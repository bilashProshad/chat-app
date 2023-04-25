import { Box } from "@mui/material";
import LoadingChats from "./LoadingChats";
import Chat from "./Chat";

const Chats = ({ chats = [], loading = false }) => {
  return (
    <Box
      width={"300px"}
      borderRight={"1px solid #ddd"}
      padding={3}
      overflow={"scroll"}
      sx={{
        overflowX: "hidden",
        backgroundColor: "#fff",
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-track": {
          background: "#fff",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#ccc",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#aaa",
        },
      }}
    >
      {loading && <LoadingChats />}
      {!loading &&
        chats.length > 0 &&
        chats.map((chat) => <Chat key={chat._id} chat={chat} />)}
    </Box>
  );
};

export default Chats;
