import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import photo1 from "../../assets/photo1.svg";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StepEmail = ({ onNext }) => {
  const [email, setEmail] = useState("");

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
              Welcome to our chat app!
            </Typography>
            <Typography textAlign={"center"}>
              Connect and chat with friends from around the world in real-time.
            </Typography>
          </Box>
          <Box component={"form"} onSubmit={submitHandler}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              sx={{
                width: "100%",
                "& .MuiInputBase-input": {
                  height: "0.4rem",
                },
                "& .MuiFormLabel-root": {
                  fontSize: email ? "1rem" : "12px",
                  top: email ? "0" : "-13%",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  fontSize: "1rem",
                  top: "0",
                },
              }}
            />
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

export default StepEmail;
