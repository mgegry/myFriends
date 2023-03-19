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
import { useEffect } from "react";

const Notifications = () => {
  useEffect(() => {}, []);

  const handleAcceptRequest = () => {};

  const handleDelclineRequest = () => {};

  return (
    <Grid container>
      <Container maxWidth="md">
        <Stack spacing={5}>
          <Paper sx={{ padding: "20px", minHeight: "17vh" }}>
            <Typography variant="h1">Requests</Typography>
          </Paper>

          <Stack>
            <Paper elevation={2} sx={{ padding: "20px", marginBottom: 1 }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack
                  direction={"row"}
                  sx={{ alignItems: "center" }}
                  spacing={2}
                >
                  <Avatar></Avatar>
                  <Typography>
                    <b>mgegry1</b>
                  </Typography>
                  <Typography>wants to add you as a friend</Typography>
                </Stack>
                <Stack direction={"row"} alignItems="center" spacing={2}>
                  <IconButton
                    sx={{ "&:hover": { color: "green" } }}
                    onClick={handleAcceptRequest}
                  >
                    <Check />
                  </IconButton>
                  <IconButton
                    sx={{ "&:hover": { color: "red" } }}
                    onClick={handleDelclineRequest}
                  >
                    <Close />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Container>
    </Grid>
  );
};

export default Notifications;
