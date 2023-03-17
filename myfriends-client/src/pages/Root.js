import { Grid } from "@mui/material";
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

  if (authenticated) {
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
          <Grid container sx={{ position: "fixed" }}>
            {/* de aici */}
            <Grid container sx={{ height: "100vh" }}>
              <Grid
                item
                xs={2}
                sx={{
                  paddingTop: "1vh",
                  backgroundColor: COLORS.white,
                }}
              >
                <Grid container sx={{}}>
                  <Navigation />
                </Grid>
              </Grid>
            </Grid>
            {/* pana aici */}
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
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    );
  }
};

export default Root;
