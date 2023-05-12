import {
  Box,
  Button,
  CardContent,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";
import photo1 from "../../assets/photo1.svg";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { getOtp } from "../../redux/actions/authAction";
import toast from "react-hot-toast";
import { clearAuthSuccess, clearError } from "../../redux/slices/authSlice";
import Loading from "../../components/Loading";

const StepEmail = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const { loading, error, success } = useSelector((state) => state.auth);

  const matches = useMediaQuery("(max-width:768px)");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    dispatch(getOtp(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      dispatch(clearAuthSuccess());
      onNext();
    }
  }, [error, dispatch, success, onNext]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Card sx={{ borderRadius: !matches ? "5px" : "0" }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: !matches ? "row" : "column",
              justifyContent: !matches ? "space-around" : "initial",
              gap: 5,
              p: !matches ? 5 : 1,
              height: !matches ? "30rem" : "100svh",
              paddingTop: matches ? "10vh" : 5,
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
            <Box width={!matches ? "28rem" : "100%"}>
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
                  Connect and chat with friends from around the world in
                  real-time.
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
      )}
    </>
  );
};

export default StepEmail;
