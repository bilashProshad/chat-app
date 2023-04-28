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

const Navbar = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
          state={state}
          onClose={toggleDrawer("top", false)}
          setState={setState}
        />
      )}
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
              onClick={toggleDrawer("top", true)}
            >
              <Badge color="error">
                <SearchIcon />
              </Badge>
            </IconButton>
          )}

          <Box display={"flex"} alignItems={"center"} gap={2}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <ProfileMenu />
          </Box>
        </Toolbar>
        {/* </Container> */}
      </AppBar>
    </Box>
  );
};

export default Navbar;
