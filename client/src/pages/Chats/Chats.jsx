import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import Chat from "../../components/Chat";
import InfoIcon from "@mui/icons-material/Info";
import ChatInput from "../../components/ChatInput/ChatInput";

const Chats = () => {
  return (
    <>
      <Layout>
        {/* <Container maxWidth={"xl"}> */}
        <Box
          display={"flex"}
          height={"calc(100svh - 4.2rem)"}
          overflow={"hidden"}
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
            <Chat />
            <Chat />
            <Chat />
          </Box>
          {/* ------- right ------- */}
          <Box flex={1} borderRight={"1px solid #eee"} position={"relative"}>
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

            <Box height={"100%"}>flkasdjflkdasfj</Box>
            <Box
              position={"sticky"}
              bottom={0}
              left={0}
              right={0}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              padding={2}
            >
              <ChatInput />
            </Box>
          </Box>
        </Box>
        {/* </Container> */}
      </Layout>
    </>
  );
};

export default Chats;
