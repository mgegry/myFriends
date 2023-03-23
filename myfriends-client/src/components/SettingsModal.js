import { Modal, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import Post from "./Post";

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

export default function PostModal({ open, handleClose }) {
  const paperRef = useRef(null);

  useClickOutside(paperRef, handleClose);

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
        <div>
          <Paper sx={{}} ref={paperRef}>
            <Stack>
              <Typography variant="h2">Settings</Typography>
            </Stack>
          </Paper>
        </div>
      </Modal>
    </div>
  );
}
