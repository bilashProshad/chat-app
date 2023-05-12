import { Container, useMediaQuery } from "@mui/material";
import NavBasic from "./NavBasic";

const LayoutBasic = ({ children }) => {
  const matches = useMediaQuery("(max-width:768px)");

  return (
    <>
      {!matches && <NavBasic />}
      <Container
        component={"div"}
        sx={{
          // height: "calc(100svh - 5rem)",
          mt: !matches ? 7 : 0,
        }}
        maxWidth={matches ? false : "md"}
        disableGutters={matches}
        // maxWidth="md"
      >
        {children}
      </Container>
    </>
  );
};

export default LayoutBasic;
