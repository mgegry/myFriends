import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import storage from "../firebaseConfig";
import authHeader from "../services/authentication/auth-header";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const AddPostDialog = ({ open, handleClose }) => {
  const [progresspercent, setProgresspercent] = useState(0);
  const [description, setDescription] = useState("");

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    console.log(e.target);
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = JSON.parse(localStorage.getItem("user"));
          const userId = user.id;

          const config = {
            headers: authHeader(),
          };

          const body = {
            description: description,
            imageUrl: downloadURL,
            userId: userId,
          };

          axios
            .post(
              process.env.REACT_APP_BASE_API_URL + `${user.username}/post`,
              body,
              config
            )
            .then(() => {})
            .catch(() => {})
            .finally(() => {});

          handleClose();
          setProgresspercent(0);
        });
      }
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography fontSize={20} textAlign="center">
            <b>Post a new picture of yourself!</b>
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Stack spacing={2}>
            <TextField
              multiline
              label="Photo description"
              onChange={handleDescription}
            >
              Description
            </TextField>
            <form onSubmit={handleSubmit} className="form">
              <Input disableUnderline type="file" />
              <Input
                disableUnderline
                type="submit"
                value={"Upload"}
                sx={{ "&:hover": { color: "red" } }}
              />
            </form>

            <LinearProgressWithLabel value={progresspercent} />

            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPostDialog;
