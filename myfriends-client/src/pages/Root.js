import { Grid, List } from "@mui/material";
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
          <Grid
            item
            xs={2}
            sx={{
              paddingTop: "1vh",
              paddingBottom: "1vh",
              backgroundColor: COLORS.white,
            }}
          >
            <Grid container sx={{}}>
              <Navigation />
            </Grid>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{
              borderLeft: "1px solid gray",
              paddingTop: "1vh",
              paddingBottom: "1vh",
              backgroundColor: `${COLORS.secondary}`,
              maxHeight: "100vh",
              overflow: "auto",
            }}
          >
            <List>
              <Outlet />
            </List>
          </Grid>
        </Grid>
      );
    }
  }
};

export default Root;
