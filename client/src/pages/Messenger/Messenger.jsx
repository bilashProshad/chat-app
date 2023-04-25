import { Avatar, Box, Button, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../redux/actions/chatAction";
import toast from "react-hot-toast";
import { clearFetchAllChatError } from "../../redux/slices/chatsSlice";
import Conversation from "../../components/Conversation";
import Chats from "../../components/Chats";

const Messenger = () => {
  const { chats, loading, error } = useSelector((state) => state.chats);
  const { currentChat } = useSelector((state) => state.currentChat);

  const dispatch = useDispatch();

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
          <Chats chats={chats} loading={loading} />
          {/* ------- right ------- */}
          <Box flex={1} borderRight={"1px solid #eee"} height={"100%"}>
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
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: "32px", height: "32px" }}
                />
                <Typography fontWeight={"bold"}>Bilash Prosad</Typography>
              </Box>
              <Box>
                <Button>
                  <InfoIcon fontSize="medium" />
                </Button>
              </Box>
            </Box>

            {/* =========== Conversation =========== */}
            <Conversation currentChat={currentChat} />
          </Box>
        </Box>
        {/* </Container> */}
      </Layout>
    </>
  );
};

export default Messenger;
