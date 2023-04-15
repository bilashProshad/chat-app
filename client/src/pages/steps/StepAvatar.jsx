import {
  Box,
  Button,
  CardContent,
  InputLabel,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import photo1 from "../../assets/photo1.svg";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import profile from "../../assets/profile.png";

const StepAvatar = () => {
  const [image, setImage] = useState(profile);

  const submitHandler = (e) => {
    e.preventDefault();

    onNext();
  };

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: 5,
          p: 5,
          height: "30rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={photo1} alt="photo 1" style={{ width: "100%" }} />
        </Box>
        <Box width={"28rem"}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              textAlign={"center"}
              component={"h1"}
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              Profile Photo
            </Typography>
            <Typography textAlign={"center"}>
              Add a profile image to personalize your account and help your
              friends recognize you.
            </Typography>
          </Box>
          <Box component={"form"} onSubmit={submitHandler}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InputLabel
                htmlFor="avatar"
                sx={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    filter: "brightness(0.8)",
                  },
                }}
              >
                <img
                  src={image}
                  alt="profile"
                  style={{
                    width: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </InputLabel>
              <input type="file" id="avatar" style={{ display: "none" }} />
            </Box>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%", mt: 2 }}
            >
              Next <ArrowForwardIcon fontSize={"small"} />
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StepAvatar;
