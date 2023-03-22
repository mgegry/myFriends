import { Widgets } from "@mui/icons-material";
import { Button, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const UserItem = () => {
  const { userId } = useParams("userId");
  const navigate = useNavigate();

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
              <Button
                onClick={() => {
                  navigate(`/admin/users/${userId}/posts`);
                }}
              >
                Posts
              </Button>
              <Button
                onClick={() => {
                  navigate(`/admin/users/${userId}/comments`);
                }}
              >
                Comments
              </Button>
              <Button
                onClick={() => {
                  navigate(`/admin/users/${userId}/likes`);
                }}
              >
                Likes
              </Button>
            </Stack>
            <Button onClick={handleBack}>Back</Button>
          </Paper>
          <Paper
            sx={{
              padding: "20px",
            }}
          >
            <Outlet />
          </Paper>
        </Stack>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default UserItem;
