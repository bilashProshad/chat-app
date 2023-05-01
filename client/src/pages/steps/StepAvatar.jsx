import {
  Box,
  Button,
  CardContent,
  InputLabel,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import photo1 from "../../assets/photo1.svg";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthSuccess, clearError } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { activateUser } from "../../redux/actions/authAction";

const StepAvatar = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(profile);
  const { name } = useSelector((state) => state.userInfo);
  const { loading, success, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setProfileImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { name };
    if (image) {
      userData.avatar = image;
    }

    dispatch(activateUser(userData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      dispatch(clearAuthSuccess());
      navigate("/messages");
    }
  }, [error, success, navigate, dispatch]);

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
                      src={imagePreview}
                      alt="profile"
                      style={{
                        width: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </InputLabel>
                  <input
                    type="file"
                    id="avatar"
                    style={{ display: "none" }}
                    onChange={setProfileImage}
                  />
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
      )}
    </>
  );
};

export default StepAvatar;
