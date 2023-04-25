import { Avatar, Box, Typography } from "@mui/material";

const Message = ({ message, self = false }) => {
  return (
    <>
      {self ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          alignSelf={"flex-end"}
        >
          <Typography
            sx={{ backgroundColor: "#1E71FF", color: "#fff" }}
            padding={1}
            paddingLeft={2}
            paddingRight={2}
            // minWidth={"10rem"}

            borderRadius={"10px 0px 10px 10px"}
          >
            {message.text}
          </Typography>
          <Avatar alt={message.sender.name} src={message.sender?.avatar?.url} />
        </Box>
      ) : (
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Avatar alt={message.sender.name} src={message.sender?.avatar?.url} />
          <Typography
            sx={{ backgroundColor: "#e4e6eb", color: "#333" }}
            padding={1}
            paddingLeft={2}
            paddingRight={2}
            // minWidth={"10rem"}
            borderRadius={"0 10px 10px 10px"}
          >
            {message.text}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Message;
