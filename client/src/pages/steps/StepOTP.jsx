import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import photo2 from "../../assets/photo2.svg";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthSuccess, clearError } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { verifyOtp } from "../../redux/actions/authAction";

const StepOTP = ({ onPrev }) => {
  const [otp, setOTP] = useState("");
  const {
    otp: { email, hash },
    loading,
    error,
    success,
  } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!otp) {
      return;
    }

    dispatch(verifyOtp({ email, otp, hash }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError);
      onPrev();
    }

    if (success) {
      dispatch(clearAuthSuccess());
      navigate("/activate");
    }
  }, [error, success, dispatch, navigate, onPrev]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              <img src={photo2} alt="photo2" style={{ width: "100%" }} />
            </Box>
            <Box width={"28rem"}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  component={"h1"}
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  Verify Email
                </Typography>
                <Typography textAlign={"center"}>
                  Enter the code we just sent you to
                </Typography>
                <Typography
                  textAlign={"center"}
                  variant="subtitle2"
                  fontWeight={"bold"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                >
                  {email}
                  <EditIcon color="primary" sx={{ fontSize: "16px" }} />
                </Typography>
              </Box>
              <Box component={"form"} onSubmit={submitHandler}>
                <TextField
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  id="outlined-basic"
                  label="OTP"
                  type="number"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      height: "0.4rem",
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: otp ? "1rem" : "12px",
                      top: otp ? "0" : "-13%",
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
                  sx={{
                    width: "100%",
                    mt: 2,
                  }}
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

export default StepOTP;
