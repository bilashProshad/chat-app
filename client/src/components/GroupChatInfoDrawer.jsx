import {
  Avatar,
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { searchUser } from "../redux/actions/searchUserAction";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import {
  clearUpdateGroupError,
  resetUpdateGroup,
} from "../redux/slices/updateGroupSlice";
import {
  addGroupUser,
  removeGroupUser,
  renameGroupChat,
} from "../redux/actions/chatAction";
import { addNewUser } from "../redux/slices/currentChatSlice";

const GroupChatInfoDrawer = ({ state, onClose, setState }) => {
  const [chatName, setChatName] = useState("");
  const [groupUsers, setGroupUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

  const { currentChat } = useSelector((state) => state.currentChat);
  const { users: searchResults } = useSelector((state) => state.searchUser);
  const { removed, error, loading, added, updated } = useSelector(
    (state) => state.updateGroup
  );

  const dispatch = useDispatch();

  // const handleClose = () => {
  //   setOpenModal(false);
  // };

  const removeGroupUserHandler = (id) => {
    setGroupUsers(groupUsers.filter((user) => user._id !== id));
    dispatch(removeGroupUser({ chatId: currentChat._id, userId: id }));
  };

  const addUserToGroupHandler = (user) => {
    setSelectedUser(user);
    dispatch(addGroupUser({ chatId: currentChat._id, userId: user._id }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      renameGroupChat({
        chatId: currentChat._id,
        chatName,
      })
    );
  };

  useEffect(() => {
    if (currentChat._id) {
      setChatName(currentChat.chatName);
      setGroupUsers(currentChat.users);
    }
  }, [currentChat]);

  useEffect(() => {
    let timeout;
    if (search.length > 0) {
      timeout = setTimeout(() => {
        dispatch(searchUser(search));
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [search, dispatch]);

  useEffect(() => {
    if (removed) {
      dispatch(resetUpdateGroup());
      toast.success("User is removed successfully");
    }

    if (updated) {
      dispatch(resetUpdateGroup());
      toast.success("Successfully rename the group");
      setState({ ...state, top: false });
    }

    if (added) {
      dispatch(resetUpdateGroup());
      toast.success("New user is added");
      dispatch(addNewUser(selectedUser));
      setSelectedUser({});
      setSearch("");
    }

    if (error) {
      toast.error(error);
      dispatch(clearUpdateGroupError());
    }
  }, [added, dispatch, error, removed, selectedUser, setState, state, updated]);

  return (
    <Drawer anchor={"top"} open={state["top"]} onClose={onClose}>
      <Box p={2}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Avatar sx={{ width: "100px", height: "100px" }}>
            {currentChat.chatName[0]}
          </Avatar>

          <Typography variant="h4" fontWeight={500} color={"#444"}>
            {currentChat.chatName}
          </Typography>
        </Box>
        <Box mt={3}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={2}
            fontWeight={"500"}
            color={"#444"}
          >
            Create Group Chat
          </Typography>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            onSubmit={submitHandler}
          >
            <TextField
              id="outlined-basic"
              label="Chat name"
              variant="outlined"
              sx={{ width: "100%" }}
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Search friends"
              variant="outlined"
              sx={{ width: "100%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Box mt={0}>
              {groupUsers.length > 0 &&
                groupUsers.map((user) => (
                  <Box
                    key={user._id}
                    component={"span"}
                    display={"inline-flex"}
                    alignItems={"center"}
                    padding={"5px 10px"}
                    borderRadius={"20px"}
                    mr={1}
                    sx={{
                      backgroundColor: "#eee",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      "&:hover": { backgroundColor: "hsl(0, 0%, 85%)" },
                    }}
                    onClick={() => removeGroupUserHandler(user._id)}
                  >
                    {user.name}
                    <CloseIcon fontSize="small" />
                  </Box>
                ))}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
              disabled={loading ? true : false}
            >
              {loading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Box>

        <Box mt={3}>
          {searchResults.length > 0 &&
            searchResults.map((user) => (
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  gap: "10px",
                  width: "100%",
                  color: "#333",
                  fontFamily: "inherit",
                  backgroundColor: "#eee",
                  marginBottom: "10px",
                }}
                disabled={loading}
                key={user._id}
                onClick={() => addUserToGroupHandler(user)}
              >
                <Avatar
                  alt={user.name}
                  src={user?.avatar?.url}
                  sx={{ width: "36px", height: "36px" }}
                />
                <Typography variant="body1" component={"p"}>
                  {user.name}
                </Typography>
              </Button>
            ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default GroupChatInfoDrawer;
