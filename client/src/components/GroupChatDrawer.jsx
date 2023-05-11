import {
  Avatar,
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../redux/actions/searchUserAction";
import { createGroupChat } from "../redux/actions/chatAction";
import { resetSearchUser } from "../redux/slices/searchUserSlice";
import toast from "react-hot-toast";
import { clearAddToChatError } from "../redux/slices/addToChatSlice";
import { updateChat } from "../redux/slices/chatsSlice";
import { setCurrentChat } from "../redux/slices/currentChatSlice";
import { resetAddGroupChat } from "../redux/slices/AddGroupChatSlice";

const GroupChatDrawer = ({ state, onClose, setState }) => {
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users: searchResults } = useSelector((state) => state.searchUser);
  const {
    newChat,
    loading,
    error: newChatError,
  } = useSelector((state) => state.addGroupChat);

  const dispatch = useDispatch();

  const removeselectedUsers = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!chatName) {
      toast.error("Please enter chat name");
      return;
    }

    if (selectedUsers.length < 2) {
      toast.error("Select at least 2 user");
      return;
    }

    dispatch(resetSearchUser());

    dispatch(
      createGroupChat({
        name: chatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      })
    );
  };

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
    if (newChatError) {
      toast.error(newChatError());
      dispatch(clearAddToChatError());
    }

    if (newChat !== null) {
      setChatName("");
      setSelectedUsers([]);
      dispatch(updateChat(newChat));
      dispatch(setCurrentChat(newChat));
      dispatch(resetAddGroupChat());
      setState({ ...state, top: false });
    }
  }, [dispatch, newChat, newChatError, setState, state]);

  return (
    <Drawer anchor={"top"} open={state["top"]} onClose={onClose}>
      <Box p={2}>
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            mb={2}
            fontWeight={"500"}
          >
            Create Group Chat
          </Typography>
          <form
            onSubmit={onSubmitHandler}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <TextField
              id="outlined-basic"
              label="Chat name"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(e) => setChatName(e.target.value)}
              value={chatName}
              required
            />
            <TextField
              id="outlined-basic"
              label="Search friends"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              required
            />
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search friends"
                  placeholder="Friends"
                  required
                />
              )}
            /> */}
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
                "Create Chat"
              )}
            </Button>
          </form>
        </Box>
        <Box mt={2}>
          {selectedUsers.length > 0 &&
            selectedUsers.map((user) => (
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
                onClick={() => removeselectedUsers(user)}
              >
                {user.name} <CloseIcon fontSize="small" />
              </Box>
            ))}
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
                }}
                key={user._id}
                onClick={() => setSelectedUsers([...selectedUsers, user])}
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

export default GroupChatDrawer;
