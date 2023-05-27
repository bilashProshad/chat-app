import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Box>
      <Typography
        textAlign={"center"}
        component={"h2"}
        variant="h4"
        mt={"35vh"}
      >
        Page not found
      </Typography>
    </Box>
  );
};

export default NotFound;
