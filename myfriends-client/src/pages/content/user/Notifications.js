import { Check, Close, Delete } from "@mui/icons-material";
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../../services/authentication/auth-header";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: authHeader(),
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_API_URL + `${user.username}/requests`,
        config
      )
      .then((response) => {
        setFriendRequests(response.data);
      });
  }, []);

  const handleAcceptRequest = (username, index) => {
    axios
      .post(
        process.env.REACT_APP_BASE_API_URL +
          `${user.username}/acceptRequest/${username}`,
        {},
        config
      )
      .then((response) => {
        var copy = [...friendRequests];
        copy.splice(index, 1);
        setFriendRequests(copy);
      });
  };

  const handleDelclineRequest = (username, index) => {
    axios
      .delete(
        process.env.REACT_APP_BASE_API_URL +
          `${user.username}/declineRequest/${username}`,
        config
      )
      .then((response) => {
        var copy = [...friendRequests];
        copy.splice(index, 1);
        setFriendRequests(copy);
      });
  };

  const handleUserProfile = (username) => {
    navigate(`/${username}`);
  };

  return (
    <Grid container>
      <Container maxWidth="md">
        <Stack spacing={5}>
          <Paper sx={{ padding: "20px", minHeight: "17vh" }}>
            <Typography variant="h1">Requests</Typography>
          </Paper>

          <Stack>
            {friendRequests.map((friendRequest, index) => {
              return (
                <Paper
                  key={friendRequest.id}
                  elevation={2}
                  sx={{ padding: "20px", marginBottom: 1 }}
                >
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack
                      direction={"row"}
                      sx={{ alignItems: "center", cursor: "pointer" }}
                      spacing={2}
                      onClick={() => {
                        handleUserProfile(friendRequest.username);
                      }}
                    >
                      <Avatar src={friendRequest.profilePicture}></Avatar>
                      <Typography>
                        <b>{friendRequest.username}</b>
                      </Typography>
                      <Typography>wants to add you as a friend</Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems="center" spacing={2}>
                      <IconButton
                        sx={{ "&:hover": { color: "green" } }}
                        onClick={() => {
                          handleAcceptRequest(friendRequest.username, index);
                        }}
                      >
                        <Check />
                      </IconButton>
                      <IconButton
                        sx={{ "&:hover": { color: "red" } }}
                        onClick={() => {
                          handleDelclineRequest(friendRequest.username, index);
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Grid>
  );
};

export default Notifications;
