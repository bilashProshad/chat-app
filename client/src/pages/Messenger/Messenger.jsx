import { Avatar, Box, Button, Typography } from "@mui/material";
import Layout from "../../components/Layout";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../redux/actions/chatAction";
import toast from "react-hot-toast";
import { clearFetchAllChatError } from "../../redux/slices/chatsSlice";
import Conversation from "../../components/Conversation";
import Chats from "../../components/Chats";
import ChatTopBar from "../../components/ChatTopBar";

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
            {currentChat._id && (
              <>
                <ChatTopBar currentChat={currentChat} />

                {/* =========== Conversation =========== */}
                <Conversation currentChat={currentChat} />
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
        </Box>
        {/* </Container> */}
      </Layout>
    </>
  );
};

export default Messenger;
