import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileMenu from "./ProfileMenu";
import Search from "./Search";

const Navbar = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box>
      <AppBar
        position="static"
        color="default"
        sx={{ backgroundColor: "#fff" }}
      >
        <Toolbar>
          <Link to={"/messages"} style={{ marginRight: "auto" }}>
            <img
              src={logo}
              alt="logo"
              style={{ height: matches ? "initial" : "32px" }}
            />
          </Link>

          {matches && <Search />}

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
      </AppBar>
    </Box>
  );
};

export default Navbar;
