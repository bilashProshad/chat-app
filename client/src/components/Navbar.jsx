import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileMenu from "./ProfileMenu";
import Search from "./Search";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchDrawer from "./SearchDrawer";
import { useSelector } from "react-redux";
import NotificationsDrawer from "./NotificationsDrawer";

const Navbar = () => {
  const matches = useMediaQuery("(min-width:768px)");

  const { notification } = useSelector((state) => state.notification);

  const [searchState, setSearchState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleSearchDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSearchState({ ...searchState, [anchor]: open });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box sx={{ borderBottom: "1px solid #ddd" }}>
      {!matches && (
        <SearchDrawer
          state={searchState}
          setState={setSearchState}
          onClose={toggleSearchDrawer("top", false)}
        />
      )}
      {/* ----------------------------------------- */}
      <NotificationsDrawer
        state={state}
        setState={setState}
        onClose={toggleDrawer(!matches ? "top" : "right", false)}
      />
      {/* ----------------------------------------- */}

      <AppBar
        position="static"
        color="default"
        sx={{ backgroundColor: "#fff", boxShadow: "none" }}
      >
        {/* <Container maxWidth={"xl"}> */}
        <Toolbar>
          <Link to={"/messages"} style={{ marginRight: "auto" }}>
            <img
              src={logo}
              alt="logo"
              style={{ height: matches ? "initial" : "32px" }}
            />
          </Link>

          {matches ? (
            <Search />
          ) : (
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={toggleSearchDrawer("top", true)}
            >
              <Badge color="error">
                <SearchIcon />
              </Badge>
            </IconButton>
          )}

          <Box display={"flex"} alignItems={"center"} gap={2} marginLeft={2}>
            {notification.length > 0 ? (
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                sx={{ position: "relative" }}
                onClick={toggleDrawer(!matches ? "top" : "right", true)}
              >
                <Badge badgeContent={1} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            ) : (
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                sx={{ position: "relative" }}
              >
                <Badge color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

            <ProfileMenu />
          </Box>
        </Toolbar>
        {/* </Container> */}
      </AppBar>
    </Box>
  );
};

export default Navbar;
