import { Avatar, Box, Drawer, Typography } from "@mui/material";

const UserProfileDrawer = ({
  state,
  onClose,
  setState,
  name,
  email,
  avatar,
}) => {
  return (
    <Drawer anchor={"top"} open={state["top"]} onClose={onClose}>
      <Box p={2}>
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
    </Drawer>
  );
};

export default UserProfileDrawer;
