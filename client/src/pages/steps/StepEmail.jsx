import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
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
  }, [error, dispatch, success]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
