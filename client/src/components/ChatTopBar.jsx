import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { getSender } from "../utils/ChatLogics";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { resetCurrentChat } from "../redux/slices/currentChatSlice";
import UserProfile from "./UserProfile";
import { useState } from "react";
import GroupChatInfo from "./GroupChatInfo";
import GroupChatInfoDrawer from "./GroupChatInfoDrawer";
import UserProfileDrawer from "./UserProfileDrawer";

const ChatTopBar = ({ currentChat }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [profileState, setProfileState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleOpenSenderProfile = () => setOpenProfileModal(true);
  const handleOpenGroupModal = () => setOpenGroupModal(true);

  const matches = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const toggleDrawerProfile = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setProfileState({ ...profileState, [anchor]: open });
  };

  const sender = getSender(user, currentChat.users);

  const backButtonHandler = () => {
    dispatch(resetCurrentChat());
  };

  return (
    <>
      {!matches && currentChat.isGroupChat ? (
        <>
          <GroupChatInfo
            openModal={openGroupModal}
            setOpenModal={setOpenGroupModal}
          />
        </>
      ) : (
        <UserProfile
          open={openProfileModal}
          setOpen={setOpenProfileModal}
          name={sender?.name}
          email={sender?.email}
          avatar={sender?.avatar}
        />
      )}

      {matches && currentChat.isGroupChat && (
        <>
          <GroupChatInfoDrawer
            setState={setState}
            state={state}
            onClose={toggleDrawer("top", false)}
          />
        </>
      )}

      {matches && !currentChat.isGroupChat && (
        <>
          <UserProfileDrawer
            state={profileState}
            setState={setProfileState}
            onClose={toggleDrawerProfile("top", false)}
            name={sender?.name}
            email={sender?.email}
            avatar={sender?.avatar}
          />
        </>
      )}

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
          {matches && (
            <IconButton aria-label="back" onClick={backButtonHandler}>
              <ArrowBackIcon color="primary" />
            </IconButton>
          )}
          {currentChat.isGroupChat ? (
            <AvatarGroup max={3} spacing={"small"}>
              {currentChat.users.map((user) => (
                <Avatar
                  key={user._id}
                  alt={user?.name}
                  src={user?.avatar?.url}
                />
              ))}
            </AvatarGroup>
          ) : (
            <Avatar
              alt={sender.name}
              src={sender?.avatar?.url}
              sx={{ width: "32px", height: "32px" }}
            />
          )}
          <Typography fontWeight={"bold"}>
            {currentChat.isGroupChat ? currentChat.chatName : sender.name}
          </Typography>
        </Box>
        <Box>
          {matches ? (
            <>
              <IconButton
                aria-label="info"
                onClick={
                  currentChat.isGroupChat
                    ? toggleDrawer("top", true)
                    : toggleDrawerProfile("top", true)
                }
              >
                <InfoIcon fontSize="medium" color="primary" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                aria-label="info"
                onClick={
                  currentChat.isGroupChat
                    ? handleOpenGroupModal
                    : handleOpenSenderProfile
                }
              >
                <InfoIcon fontSize="medium" color="primary" />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChatTopBar;
