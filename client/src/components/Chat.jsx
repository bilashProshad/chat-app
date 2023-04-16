import { Avatar, Box, Typography } from "@mui/material";

const Chat = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      mb={2}
      p={1}
      borderRadius={2}
      borderBottom={"1px solid #eee"}
      sx={{
        cursor: "pointer",
        transition: "all 0.4s",
        "&:hover": {
          backgroundColor: "#9993",
        },
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Box>
          <Typography variant="h6" fontSize={16} fontWeight={"bold"}>
            Bilash Prosad
          </Typography>
          <Typography variant="caption">Hey, how are you?</Typography>
        </Box>
      </Box>
      <Typography fontSize={12}>1h</Typography>
    </Box>
  );
};

export default Chat;
