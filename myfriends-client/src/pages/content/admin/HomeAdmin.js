import { Grid, List, Paper, Typography } from "@mui/material";
import { margin, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { COLORS } from "../../../values/colors";
import Unauthorized from "../../errors/Unauthorized";
import CustomLink from "../../../components/CustomLink";

const HomeAdmin = () => {
  const [authenticated, setAuthenticated] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {
      setAuthenticated(loggedInUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (authenticated && authenticated.roles.includes("ROLE_ADMIN")) {
    return (
      <Grid container>
        <Grid item xs={2} sx={{ paddingTop: "20px" }}>
          <Typography
            color={COLORS.textPrimary}
            fontSize={"2rem"}
            align="center"
          >
            <u>
              <b>Admin Panel</b>
            </u>
          </Typography>
          <Paper
            sx={{
              margin: "20px",
              height: "30vh",
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: "20px",
            }}
          >
            <Stack spacing={4}>
              <CustomLink
                title="Users"
                color={COLORS.textSecondary}
                hoverColor={COLORS.white}
                hoverBackgroundColor={COLORS.primary}
                onClick={() => {
                  navigate("/admin/users");
                }}
              />

              <CustomLink
                title="Posts"
                color={COLORS.textSecondary}
                hoverColor={COLORS.white}
                hoverBackgroundColor={COLORS.primary}
                onClick={() => {
                  navigate("/admin/posts");
                }}
              />

              <CustomLink
                title="Log out"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
                color="#DB3A34"
                hoverColor={COLORS.white}
                hoverBackgroundColor="#DB3A34"
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid
          item
          xs={10}
          sx={{
            padding: "20px",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <List>
            <Outlet />
          </List>
        </Grid>
      </Grid>
    );
  } else {
    return <Unauthorized />;
  }
};

export default HomeAdmin;
