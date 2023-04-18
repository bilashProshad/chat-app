import { Avatar, Box, Typography } from "@mui/material";

const Message = ({ self = false }) => {
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
            Hello
          </Typography>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </Box>
      ) : (
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Typography
            sx={{ backgroundColor: "#e4e6eb", color: "#333" }}
            padding={1}
            paddingLeft={2}
            paddingRight={2}
            // minWidth={"10rem"}
            borderRadius={"0 10px 10px 10px"}
          >
            Hello
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Message;
