import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

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

const GroupChatModal = ({ openModal, setOpenModal }) => {
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setOpenModal(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            mb={2}
            fontWeight={"500"}
          >
            Create Group Chat
          </Typography>
          <form
            onSubmit={onSubmitHandler}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <TextField
              id="outlined-basic"
              label="Chat name"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(e) => setChatName(e.target.value)}
              value={chatName}
              required
            />
            <TextField
              id="outlined-basic"
              label="Search friends"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              required
            />
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search friends"
                  placeholder="Friends"
                  required
                />
              )}
            /> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
            >
              Create Chat
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default GroupChatModal;
