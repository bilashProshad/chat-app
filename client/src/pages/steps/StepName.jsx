import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import photo1 from "../../assets/photo1.svg";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch } from "react-redux";
import { setUsername } from "../../redux/slices/userInfoSlice";

const StepName = ({ onNext }) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name) return;

    dispatch(setUsername(name));

    onNext();
  };

  return (
    <Card sx={{ mt: "7rem" }}>
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
          <img src={photo1} alt="photo1" style={{ width: "100%" }} />
        </Box>
        <Box width={"28rem"}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              textAlign={"center"}
              component={"h1"}
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              What's your full name
            </Typography>
            <Typography textAlign={"center"}>
              People use real name in our app
            </Typography>
          </Box>
          <Box component={"form"} onSubmit={submitHandler}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="outlined-basic"
              label="Name"
              type="text"
              variant="outlined"
              sx={{
                width: "100%",
                "& .MuiInputBase-input": {
                  height: "0.4rem",
                },
                "& .MuiFormLabel-root": {
                  fontSize: name ? "1rem" : "12px",
                  top: name ? "0" : "-13%",
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

export default StepName;
