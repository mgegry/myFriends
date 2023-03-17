import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import CustomLink from "./CustomLink";
import { COLORS } from "../values/colors";

import { useNavigate } from "react-router-dom";
import React from "react";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Stack spacing={5} sx={{ width: "100%" }}>
        <Typography color={COLORS.textPrimary} fontSize={"2rem"} align="center">
          <u>
            <b>myFriends</b>
          </u>
        </Typography>
        <Stack spacing={4} sx={{ paddingLeft: "5%" }}>
          <CustomLink
            title="Home"
            color={COLORS.textSecondary}
            hoverColor={COLORS.white}
            hoverBackgroundColor={COLORS.primary}
            onClick={() => {
              navigate("/");
            }}
          />
          <CustomLink
            title="Profile"
            color={COLORS.textSecondary}
            hoverColor={COLORS.white}
            hoverBackgroundColor={COLORS.primary}
            onClick={() => {
              navigate("/profile");
            }}
          />
          <CustomLink
            title="Notifications"
            color={COLORS.textSecondary}
            hoverColor={COLORS.white}
            hoverBackgroundColor={COLORS.primary}
            onClick={() => {
              navigate("/notifications");
            }}
          />
          <CustomLink
            title="Settings"
            color={COLORS.textSecondary}
            hoverColor={COLORS.white}
            hoverBackgroundColor={COLORS.primary}
            onClick={() => {
              navigate("/settings");
            }}
          />
          <CustomLink
            title="Log out"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("./login");
            }}
            color="#DB3A34"
            hoverColor={COLORS.white}
            hoverBackgroundColor="#DB3A34"
          />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Navigation;
