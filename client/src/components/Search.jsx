import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../redux/actions/searchUserAction";
import toast from "react-hot-toast";
import {
  clearSearchUserError,
  resetSearchUser,
} from "../redux/slices/searchUserSlice";
import SearchResults from "./SearchResults";
import {
  clearAddToChatError,
  resetAddToChat,
} from "../redux/slices/addToChatSlice";
import { updateChat } from "../redux/slices/chatsSlice";

export default function Search() {
  const [search, setSearch] = useState("");
  const matches = useMediaQuery("(max-width:768px)");
  const { users, error } = useSelector((state) => state.searchUser);
  const { newChat, error: newChatError } = useSelector(
    (state) => state.addToChat
  );

  const dispatch = useDispatch();

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
    if (error) {
      toast.error(error);
      dispatch(clearSearchUserError());
    }
  }, [error, dispatch]);

  return (
    <SearchBox>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />

      {!matches && users.length > 0 && <SearchResults users={users} />}
    </SearchBox>
  );
}

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#999", 0.15),
  "&:hover": {
    backgroundColor: alpha("#999", 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
