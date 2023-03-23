import { Grid, List, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { COLORS } from "../values/colors";

const Root = () => {
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

  if (authenticated != null) {
    if (authenticated.roles.includes("ROLE_USER")) {
      return (
        <Grid container sx={{ height: "100vh" }}>
          <Grid item xs={2} sx={{ paddingTop: "20px" }}>
            <Typography
              color={COLORS.textPrimary}
              fontSize={"2rem"}
              align="center"
            >
              <u>
                <b>myFriends</b>
              </u>
            </Typography>
            <Paper
              sx={{
                margin: "20px",
                height: "40vh",
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "20px",
              }}
            >
              <Navigation />
            </Paper>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{
              backgroundColor: `${COLORS.secondary}`,
              maxHeight: "100vh",
              overflow: "auto",
            }}
          >
            <List sx={{ paddingTop: "20px" }}>
              <Outlet />
            </List>
          </Grid>
        </Grid>
      );
    }
  }
};

export default Root;
