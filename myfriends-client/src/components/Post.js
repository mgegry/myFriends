import {
  AddCommentOutlined,
  CommentOutlined,
  Favorite,
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
import { useEffect, useState } from "react";
import authHeader from "../services/authentication/auth-header";
import dateUtils from "../utils/dateUtils";

const Post = ({ postEntity }) => {
  const [post, setPost] = useState(postEntity);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);

  const postedBy = post.post.user.username;
  const profilePicturePostBy = post.post.user.profilePicture;

  const description = post.post.description;
  const numberOfComments = post.comments.length;
  const comments = post.comments;
  const imageUrl = post.post.imageUrl;

  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: authHeader(),
  };

  const handleAddComment = () => {
    const body = {
      commentText: commentText,
      userId: user.id,
      postId: post.post.id,
    };

    if (commentText !== "" && commentText.trim().length !== 0) {
      axios
        .post(
          process.env.REACT_APP_BASE_API_URL + `${user.username}/comment`,
          body,
          config
        )
        .then((response) => {
          axios
            .get(
              process.env.REACT_APP_BASE_API_URL + `posts/${post.post.id}`,
              config
            )
            .then((response) => {
              setPost(response.data);
              setCommentText("");
            });
        })
        .catch((err) => {})
        .finally(() => {});
    }
  };

  const handleLike = () => {
    const body = {
      postId: post.post.id,
      userLikeId: user.id,
    };

    axios
      .post(process.env.REACT_APP_BASE_API_URL + "like", body, config)
      .then(() => {
        setLiked(true);
        setNumberOfLikes(numberOfLikes + 1);
      });
  };

  const handleUnlike = () => {
    axios
      .delete(
        process.env.REACT_APP_BASE_API_URL +
          `like?postId=${post.post.id}&userId=${user.id}`,
        config
      )
      .then(() => {
        setLiked(false);
        setNumberOfLikes(numberOfLikes - 1);
      });
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_API_URL +
          `like?userId=${user.id}&postId=${post.post.id}`,
        config
      )
      .then((response) => {
        setLiked(response.data);
      });
  }, []);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={profilePicturePostBy}></Avatar>}
        title={<b>{postedBy}</b>}
        subheader={dateUtils.getDateAndTime(post.post.createdAt)}
      />
      <CardMedia component="img" image={imageUrl} />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction={"row"} spacing={2}>
            {liked ? (
              <Stack direction={"row"} spacing={1}>
                <Favorite
                  onClick={() => {
                    handleUnlike();
                  }}
                />
                <Typography>{numberOfLikes}</Typography>
              </Stack>
            ) : (
              <Stack direction={"row"} spacing={1}>
                <FavoriteBorder
                  onClick={() => {
                    handleLike();
                  }}
                />
                <Typography>{numberOfLikes}</Typography>
              </Stack>
            )}

            <Stack direction={"row"} spacing={1}>
              <CommentOutlined />
              <Typography>{numberOfComments}</Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
            <Avatar
              alt="Remy Sharp"
              src={profilePicturePostBy}
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
                        src={
                          comment.user.profilePicture
                            ? comment.user.profilePicture
                            : ""
                        }
                      />
                      <Typography fontSize={14}>
                        <b>{comment.user.username}</b>
                      </Typography>
                      <Typography fontSize={12}>
                        {dateUtils.getDateAndTime(comment.createdAt)}
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
            value={commentText}
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
