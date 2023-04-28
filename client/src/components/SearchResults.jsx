import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUserToChat } from "../redux/actions/chatAction";

import { resetSearchUser } from "../redux/slices/searchUserSlice";

const SearchResults = ({ users }) => {
  const dispatch = useDispatch();

  const addToChatHandler = (userId) => {
    dispatch(addUserToChat(userId));
    dispatch(resetSearchUser());
  };

  return (
    <Card sx={{ position: "absolute", top: "3.5rem", right: "0" }}>
      <CardContent sx={{ width: "250px" }}>
        {users.length > 0 &&
          users.map((user) => (
            <Button
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "10px",
                width: "100%",
                color: "#333",
                fontFamily: "inherit",
              }}
              key={user._id}
              onClick={() => addToChatHandler(user._id)}
            >
              <Avatar
                alt={user.name}
                src={user?.avatar?.url}
                sx={{ width: "36px", height: "36px" }}
              />
              <Typography variant="body1" component={"p"}>
                {user.name}
              </Typography>
            </Button>
          ))}
      </CardContent>
    </Card>
  );
};

export default SearchResults;
