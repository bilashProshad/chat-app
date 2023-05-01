import {
  Avatar,
  Box,
  Button,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChat } from "../redux/slices/currentChatSlice";

const NotificationsDrawer = ({ state, onClose, setState }) => {
  const { notification } = useSelector((state) => state.notification);
  const matches = useMediaQuery("(max-width:768px)");

  const dispatch = useDispatch();

  const startChatHandler = (n) => {
    // dispatch()
    dispatch(setCurrentChat(n.chat));
    matches
      ? setState({ ...state, top: false })
      : setState({ ...state, right: false });
  };

  return (
    <React.Fragment>
      <Drawer
        anchor={matches ? "top" : "right"}
        open={state[matches ? "top" : "right"]}
        onClose={onClose}
      >
        <Box
          padding={"1rem"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={matches ? "flex-start" : ""}
          gap={"0.5rem"}
        >
          {notification.length > 0 &&
            notification.map((n) => (
              <Button
                key={n._id}
                sx={{
                  gap: "0.5rem",
                  textTransform: "none",
                }}
                onClick={() => startChatHandler(n)}
              >
                <Avatar alt={n.sender.name} src={n?.sender?.avatar?.url} />
                <Typography color={"#333"}>
                  <span style={{ fontWeight: "bold" }}>{n.sender.name}</span>{" "}
                  sent you a message
                </Typography>
              </Button>
            ))}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default NotificationsDrawer;
