import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import logo from "../assets/logo.svg";

const NavBasic = () => {
  return (
    <AppBar
      position="static"
      color="bg"
      sx={{ boxShadow: "none", pt: 3, pb: 3, height: "5rem" }}
    >
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Logo" style={{ cursor: "pointer" }} />
      </Container>
    </AppBar>
  );
};

export default NavBasic;
