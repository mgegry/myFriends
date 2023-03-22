import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import authHeader from "../../../services/authentication/auth-header";
import dateUtils from "../../../utils/dateUtils";

const UserItem = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams("userId");
  const navigate = useNavigate();

  const config = {
    headers: authHeader(),
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + `admin/users/${userId}`, config)
      .then((response) => {
        setUser(response.data);
      });
  }, [userId]);

  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Stack spacing={2}>
          <Paper
            sx={{
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction={"row"} spacing={5}>
              <Link
                onClick={() => {
                  navigate(`/admin/users/${userId}/posts`);
                }}
              >
                Posts
              </Link>
              <Link
                onClick={() => {
                  navigate(`/admin/users/${userId}/comments`);
                }}
              >
                Comments
              </Link>
              <Link
                onClick={() => {
                  navigate(`/admin/users/${userId}/likes`);
                }}
              >
                Likes
              </Link>
            </Stack>
            <Button onClick={handleBack}>Back</Button>
          </Paper>

          <Paper sx={{ padding: "20px" }}>
            {user ? (
              <Stack direction={"row"} spacing={10}>
                <Avatar
                  src={user.profilePicture}
                  sx={{ width: 150, height: 150 }}
                ></Avatar>
                <Stack>
                  <Stack direction={"row"} spacing={2}>
                    <Typography>
                      <b>ID:</b>
                    </Typography>
                    <Typography>{user.id}</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2}>
                    <Typography>
                      <b>Username:</b>
                    </Typography>
                    <Typography>{user.username}</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2}>
                    <Typography>
                      <b>First Name:</b>
                    </Typography>
                    <Typography>{user.firstName}</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2}>
                    <Typography>
                      <b>Last Name:</b>
                    </Typography>
                    <Typography>{user.lastName}</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2}>
                    <Typography>
                      <b>Email:</b>
                    </Typography>
                    <Typography>{user.email}</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2}>
                    <Typography>
                      <b>Bio:</b>
                    </Typography>
                    <Typography>{user.bio}</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2}>
                    <Typography>
                      <b>Created At:</b>
                    </Typography>
                    <Typography>
                      {dateUtils.getDateAndTime(user.createdAt)}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ) : null}
          </Paper>

          <Outlet />
        </Stack>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default UserItem;
