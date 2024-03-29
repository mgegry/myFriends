import { Delete } from "@mui/icons-material";
import { IconButton, List, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/authentication/auth-header";
import dateUtils from "../../utils/dateUtils";

const PostCard = ({ postEntity, posts, setPosts }) => {
  const [post, sePost] = useState(postEntity);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const navigate = useNavigate();

  const config = {
    headers: authHeader(),
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_API_URL + `admin/comments?postId=${post.id}`,
        config
      )
      .then((response) => {
        setComments(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_API_URL + `admin/likes?postId=${post.id}`,
        config
      )
      .then((response) => {
        setLikes(response.data);
      });
  }, []);

  const handleUserProfile = (userId) => {
    navigate(`/admin/users/${userId}/`);
  };

  const handleDeleteFromParentArray = () => {
    var copy = [...posts];

    copy = copy.filter((p) => {
      return p.id !== post.id;
    });
    setPosts(copy);
  };

  const handleIconDelete = () => {
    axios
      .delete(
        process.env.REACT_APP_BASE_API_URL + `admin/posts/${post.id}`,
        config
      )
      .then(() => {
        handleDeleteFromParentArray();
      });
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <IconButton onClick={handleIconDelete}>
          <Delete />
        </IconButton>
      </div>

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
            <b>ID:</b> {post.id}
          </Typography>
          <Typography
            onClick={() => {
              handleUserProfile(post.user.id);
            }}
            sx={{ cursor: "pointer" }}
          >
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

      <Stack direction={"row"} spacing={2}>
        <Stack sx={{ width: "50%" }}>
          <Typography>
            <b>Comments:</b>
          </Typography>
          <Paper
            elevation={2}
            sx={{
              padding: "20px",
              overflow: "auto",
              height: "30vh",
            }}
          >
            <List>
              {comments.length === 0 ? (
                <Typography>
                  <i>"No comments for this post"</i>
                </Typography>
              ) : null}

              {comments.map((comment) => {
                return (
                  <Stack key={comment.id} sx={{ marginBottom: "10px" }}>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleUserProfile(comment.user.id);
                      }}
                    >
                      <b>User:</b> {comment.user.username}
                    </Typography>
                    <Typography>
                      <b>Posted At:</b>{" "}
                      {dateUtils.getDateAndTime(comment.createdAt)}
                    </Typography>
                    <Typography>
                      <b>Comment:</b> {comment.commentText}
                    </Typography>
                  </Stack>
                );
              })}
            </List>
          </Paper>
        </Stack>

        <Stack sx={{ width: "50%" }}>
          <Typography>
            <b>Likes:</b>
          </Typography>
          <Paper
            elevation={2}
            sx={{ padding: "20px", overflow: "auto", height: "30vh" }}
          >
            <List>
              {likes.length === 0 ? (
                <Typography>
                  <i>"No likes for this post"</i>
                </Typography>
              ) : null}

              {likes.map((like) => {
                return (
                  <Stack key={like.id} sx={{ marginBottom: "10px" }}>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleUserProfile(like.user.id);
                      }}
                    >
                      <b>User:</b> {like.user.username}
                    </Typography>
                  </Stack>
                );
              })}
            </List>
          </Paper>
        </Stack>
      </Stack>

      <Stack></Stack>
    </Paper>
  );
};

export default PostCard;
