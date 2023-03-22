import { List, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../../services/authentication/auth-header";
import dateUtils from "../../utils/dateUtils";

const PostCard = ({ postEntity }) => {
  const [post, sePost] = useState(postEntity);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const config = {
    headers: authHeader(),
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + `comments/${post.id}`, config)
      .then((response) => {
        setComments(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + `likes/${post.id}`, config)
      .then((response) => {
        setLikes(response.data);
      });
  }, []);

  return (
    <Paper
      sx={{
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "stretch",
        alignContent: "stretch",
        gap: "20px",
      }}
      elevation={5}
    >
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      > */}
      <Stack direction={"row"} spacing={10} alignItems="center">
        <img
          src={post.imageUrl}
          alt="postImage"
          style={{
            maxWidth: "300px",
            border: "1px solid gray",
          }}
        />

        <Stack>
          <Typography>
            <b>Posted by:</b> {post.user.username}
          </Typography>
          <Typography>
            <b>Description:</b> {post.description}
          </Typography>
          <Typography>
            <b>Date:</b> {dateUtils.getDateAndTime(post.createdAt)}
          </Typography>
          <Typography>
            <b>Number of likes:</b> {likes.length}
          </Typography>
          <Typography>
            <b>Number of comments:</b> {comments.length}
          </Typography>
        </Stack>
      </Stack>

      {/* </div> */}

      <Stack direction={"row"} spacing={2}>
        <Paper
          elevation={2}
          sx={{
            padding: "20px",
            width: "50%",
            overflow: "auto",
            height: "30vh",
          }}
        >
          <List>
            {comments.map((comment) => {
              return <Typography>{comment.commentText}</Typography>;
            })}
          </List>
        </Paper>

        <Paper elevation={2} sx={{ padding: "20px", width: "50%" }}>
          {likes.map((like) => {
            return <Typography>{like.user.id}</Typography>;
          })}
        </Paper>
      </Stack>

      <Stack></Stack>
    </Paper>
  );
};

export default PostCard;
