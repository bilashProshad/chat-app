import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const UserProfile = ({ open, setOpen, name, email, avatar }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          {/* <Avatar   />  */}
          <Avatar
            sx={{ width: "128px", height: "128px" }}
            src={avatar?.url}
            alt={name}
          />
          <Typography variant="h4" component={"h2"} mt={3} color={"#444"}>
            {name}
          </Typography>
          <Typography variant="body1" color={"#555"}>
            {email}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserProfile;
