import { Container } from "@mui/material";
import NavBasic from "./NavBasic";

const LayoutBasic = ({ children }) => {
  return (
    <>
      <NavBasic />
      <Container
        sx={{
          height: "calc(100svh - 5rem)",
          mt: 7,
        }}
        maxWidth="md"
      >
        {children}
      </Container>
    </>
  );
};

export default LayoutBasic;
