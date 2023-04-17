import { Avatar, Box, Button, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import Chat from "../../components/Chat";
import InfoIcon from "@mui/icons-material/Info";
import ChatInput from "../../components/ChatInput/ChatInput";
import Message from "../../components/Message";

const Chats = () => {
  return (
    <>
      <Layout>
        {/* <Container maxWidth={"xl"}> */}
        <Box
          display={"flex"}
          height={"calc(100svh - 4.3rem)"}
          // overflow={"hidden"}
        >
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
            <Chat />
            <Chat />
          </Box>
          {/* ------- right ------- */}
          <Box flex={1} borderRight={"1px solid #eee"} height={"100%"}>
            <Box
              padding={2}
              sx={{ borderBottom: "1px solid #eee" }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
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
                  <Message />
                  <Message self={true} />
                </Box>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                sx={{ width: "100%" }}
              >
                <ChatInput />
              </Box>
            </Box>
          </Box>
        </Box>
        {/* </Container> */}
      </Layout>
    </>
  );
};

export default Chats;
