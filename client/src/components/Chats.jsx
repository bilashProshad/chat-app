import { Box, Button, Typography } from "@mui/material";
import LoadingChats from "./LoadingChats";
import Chat from "./Chat";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import GroupChatModal from "./GroupChatModal";

const Chats = ({ chats = [], loading = false }) => {
  const matches = useMediaQuery("(max-width:768px)");
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Box
        width={matches ? "100%" : "300px"}
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
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ borderBottom: "1px solid #eee" }}
          marginBottom={1}
          paddingBottom={1}
        >
          <Typography fontWeight={"bold"} variant="h6">
            Group Chat
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "none",
            }}
            variant="contained"
            color="primary"
          >
            New <AddIcon fontSize="small" />
          </Button>
        </Box>
        {loading && <LoadingChats />}
        {!loading &&
          chats.length > 0 &&
          chats.map((chat) => <Chat key={chat._id} chat={chat} />)}
      </Box>

      <GroupChatModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Chats;
