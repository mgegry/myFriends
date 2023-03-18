import {
  AddCommentOutlined,
  CommentOutlined,
  FavoriteBorder,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import authHeader from "../services/authentication/auth-header";

const Post = ({ post }) => {
  const [commentText, setCommentText] = useState("");

  const postedBy = post.post.user.username;

  const description = post.post.description;

  const numberOfLikes = post.likes.length;
  const numberOfComments = post.comments.length;
  const comments = post.comments;
  const imageUrl = post.post.imageUrl;

  const getDateAndTime = (value) => {
    value = new Date(value);

    var minutes = value.getMinutes().toString();
    var hours = value.getHours().toString();

    if (value.getMinutes().toString().length === 1) {
      minutes = "0" + minutes;
    }

    if (value.getHours.toString().length === 1) {
      hours = "0" + hours;
    }

    const postedAt =
      hours +
      ":" +
      minutes +
      " " +
      value.getDate().toString() +
      "/" +
      value.getMonth().toString() +
      "/" +
      value.getFullYear().toString();

    return postedAt;
  };

  const handleAddComment = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const config = {
      headers: authHeader(),
    };

    const body = {
      commentText: commentText,
      userId: user.id,
      postId: post.post.id,
    };

    axios
      .post(
        process.env.REACT_APP_BASE_API_URL + `${user.username}/comment`,
        body,
        config
      )
      .then((response) => {})
      .catch((err) => {})
      .finally(() => {});
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar></Avatar>}
        title={<b>{postedBy}</b>}
        subheader={getDateAndTime(post.post.createdAt)}
      />
      <CardMedia component="img" image={imageUrl} />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction={"row"} spacing={2}>
            <Stack direction={"row"} spacing={1}>
              <FavoriteBorder />
              <Typography>{numberOfLikes}</Typography>
            </Stack>

            <Stack direction={"row"} spacing={1}>
              <CommentOutlined />
              <Typography>{numberOfComments}</Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
            <Avatar
              alt="Remy Sharp"
              src="https://blog.hootsuite.com/wp-content/uploads/2021/07/free-stock-photos-03-scaled.jpeg"
              sx={{ width: 20, height: 20 }}
            />
            <Typography fontSize={14}>
              <b>{postedBy}</b>
            </Typography>
            <Typography>{description}</Typography>
          </Stack>

          <Stack
            sx={{
              maxHeight: 150,
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "5px",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "23px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "gray",
                borderRadius: "10px",
              },
            }}
          >
            <List>
              {comments.map((comment) => {
                return (
                  <Stack key={comment.id} sx={{ marginBottom: "10px" }}>
                    <Stack direction={"row"} spacing={1} alignItems="center">
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ width: 20, height: 20 }}
                        src="https://www.befunky.com/images/prismic/5ddfea42-7377-4bef-9ac4-f3bd407d52ab_landing-photo-to-cartoon-img5.jpeg?auto=avif,webp&format=jpg&width=863"
                      />
                      <Typography fontSize={14}>
                        <b>{comment.user.username}</b>
                      </Typography>
                      <Typography fontSize={12}>
                        {getDateAndTime(comment.createdAt)}
                      </Typography>
                    </Stack>
                    <Typography>{comment.commentText}</Typography>
                  </Stack>
                );
              })}
            </List>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack sx={{ width: "100%" }} direction="row">
          <TextField
            variant="standard"
            label="Add comment"
            fullWidth
            onChange={(event) => {
              setCommentText(event.target.value);
            }}
          />

          <IconButton onClick={handleAddComment}>
            <AddCommentOutlined />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Post;
