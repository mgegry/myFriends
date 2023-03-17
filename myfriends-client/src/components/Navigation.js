import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import CustomLink from "./CustomLink";
import { COLORS } from "../values/colors";

import { useNavigate } from "react-router-dom";
import React from "react";
import AddPostDialog from "./AddPostDialog";

const Navigation = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            title="Add Post"
            color={COLORS.textSecondary}
            hoverColor={COLORS.white}
            hoverBackgroundColor={COLORS.primary}
            onClick={() => {
              handleClickOpen();
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

      <AddPostDialog handleClose={handleClose} open={open} />
    </Grid>
  );
};

export default Navigation;
