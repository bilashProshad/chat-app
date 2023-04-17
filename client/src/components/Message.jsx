import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

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
            padding={0.5}
            paddingLeft={2}
            paddingRight={1}
            minWidth={"10rem"}
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
            padding={0.5}
            paddingLeft={2}
            paddingRight={1}
            minWidth={"10rem"}
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
