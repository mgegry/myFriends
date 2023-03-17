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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import storage from "../firebaseConfig";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const AddPostDialog = ({ open, handleClose }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

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
          setImgUrl(downloadURL);
          // TODO:: Add post to db
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
            <TextField multiline label="Photo description">
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
