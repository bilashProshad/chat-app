import { Avatar, Box, Button, Drawer, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { addUserToChat } from "../redux/actions/chatAction";
import {
  clearSearchUserError,
  resetSearchUser,
} from "../redux/slices/searchUserSlice";
import { useEffect, useState } from "react";
import { searchUser } from "../redux/actions/searchUserAction";
import toast from "react-hot-toast";
import {
  clearAddToChatError,
  resetAddToChat,
} from "../redux/slices/addToChatSlice";
import { updateChat } from "../redux/slices/chatsSlice";

const SearchDrawer = ({ state, onClose, setState }) => {
  const [search, setSearch] = useState("");
  const { users, error } = useSelector((state) => state.searchUser);
  const { newChat, error: newChatError } = useSelector(
    (state) => state.addToChat
  );

  const dispatch = useDispatch();

  const addToChatHandler = (userId) => {
    dispatch(addUserToChat(userId));
    dispatch(resetSearchUser());
    setState({ ...state, top: false });
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (search.length > 0) {
        dispatch(searchUser(search));
      }
    }, 500);

    if (search.length < 1) {
      dispatch(resetSearchUser());
    }

    return () => clearTimeout(timeout);
  }, [dispatch, search]);

  useEffect(() => {
    if (newChatError) {
      toast.error(newChatError());
      dispatch(clearAddToChatError());
    }

    if (newChat) {
      dispatch(updateChat(newChat));
      dispatch(resetAddToChat());
    }
  }, [dispatch, newChat, newChatError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSearchUserError());
    }
  }, [error, dispatch]);

  return (
    <Drawer anchor={"top"} open={state["top"]} onClose={onClose}>
      <Box padding={"1rem"} paddingTop={"2rem"}>
        <Search sx={{ borderBottom: "1px solid #999" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box
          marginTop={"1rem"}
          display={"flex"}
          flexDirection={"column"}
          gap={"0.5rem"}
        >
          {users.length > 0 &&
            users.map((user) => (
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
                onClick={() => addToChatHandler(user._id)}
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

export default SearchDrawer;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
