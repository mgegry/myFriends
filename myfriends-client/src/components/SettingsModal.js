import { Article, Email, Person } from "@mui/icons-material";
import { Button, Modal, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import authHeader from "../services/authentication/auth-header";
import IconTextField from "./IconTextField";

function useClickOutside(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function SettingsModal({ open, handleClose, setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const paperRef = useRef(null);

  const config = {
    headers: authHeader(),
  };

  useClickOutside(paperRef, handleClose);

  const handleUpdateData = () => {
    console.log(typeof body);
    var body = {};

    if (firstName.trim().length >= 3) {
      body.firstName = firstName.trim();
    }

    if (lastName.trim().length >= 3) {
      body.lastName = lastName.trim();
    }

    if (username.trim().length >= 3) {
      body.username = username.trim();
    }

    if (email.trim().length !== 0) {
      body.email = email.trim();
    }

    if (bio.trim().length !== 0) {
      body.bio = bio.trim();
    }

    axios
      .put(
        process.env.REACT_APP_BASE_API_URL + `${user.username}`,
        body,
        config
      )
      .then((response) => {
        setUser(response.data);
        handleClose();
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%" }}>
          <Paper sx={{ padding: "20px" }} ref={paperRef}>
            <Stack spacing={4}>
              <Typography variant="h2">Settings</Typography>
              <Stack spacing={2}>
                <IconTextField
                  label="First Name"
                  iconStart={<Person />}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
                <IconTextField
                  label="Last Name"
                  iconStart={<Person />}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
                <IconTextField
                  label="Username"
                  iconStart={<Person />}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                />
                <IconTextField
                  label="Email"
                  iconStart={<Email />}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <IconTextField
                  label="Bio"
                  iconStart={<Article />}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  value={bio}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button fullWidth onClick={handleUpdateData}>
                    Update Data
                  </Button>
                  <Button color="error" onClick={handleClose} fullWidth>
                    Cancel
                  </Button>
                </div>
              </Stack>
            </Stack>
          </Paper>
        </div>
      </Modal>
    </div>
  );
}
