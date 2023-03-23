import { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../services/authentication/auth-header";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import CustomIconTypography from "./CustomIconTypography";
import { Cancel, Delete } from "@mui/icons-material";
import dateUtils from "../../utils/dateUtils";

const CommentsUserAdmin = () => {
  const [comments, setComments] = useState([]);

  const { userId } = useParams();

  const navigate = useNavigate();

  const config = {
    headers: authHeader(),
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_API_URL + `admin/comments?userId=${userId}`,
        config
      )
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      });
  }, []);

  const handleUserProfile = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  return (
    <Stack spacing={2}>
      {comments.map((comment) => {
        return (
          <Paper sx={{ padding: "20px" }} elevation={2}>
            <Stack spacing={2}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <IconButton>
                  <Delete />
                </IconButton>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <img
                  src={comment.post.imageUrl}
                  alt="postImage"
                  style={{
                    maxWidth: "300px",
                    border: "1px solid gray",
                  }}
                />
              </div>
              <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
                <Stack sx={{ width: "50%" }}>
                  <Typography sx={{ padding: "10px" }}>
                    <b>Comment Information:</b>
                  </Typography>
                  <Paper sx={{ padding: "20px" }} elevation={3}>
                    <Stack spacing={1}>
                      <CustomIconTypography label="ID:" value={comment.id} />
                      <CustomIconTypography
                        label="Post ID:"
                        value={comment.post.id}
                      />
                      <CustomIconTypography
                        label="Text:"
                        value={comment.commentText}
                      />

                      <CustomIconTypography
                        label="Created At:"
                        value={dateUtils.getDateAndTime(comment.createdAt)}
                      />
                    </Stack>
                  </Paper>
                </Stack>

                <Stack sx={{ width: "50%" }}>
                  <Typography sx={{ padding: "10px" }}>
                    <b>Post Information:</b>
                  </Typography>
                  <Paper sx={{ padding: "20px" }}>
                    <Stack spacing={1}>
                      <CustomIconTypography
                        label="ID:"
                        value={comment.post.id}
                      />
                      <CustomIconTypography
                        label="Description:"
                        value={comment.post.description}
                      />
                      <CustomIconTypography
                        label="Uploader username:"
                        value={comment.post.user.username}
                        onClick={() => {
                          handleUserProfile(comment.post.user.id);
                        }}
                        sx={{ cursor: "pointer" }}
                      />
                      <CustomIconTypography
                        label="Created At:"
                        value={dateUtils.getDateAndTime(comment.post.createdAt)}
                      />
                    </Stack>
                  </Paper>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};

export default CommentsUserAdmin;
