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

const Post = ({ post }) => {
  const postedBy = post.post.user.username;
  const date = new Date(post.post.createdAt);
  const postedAt =
    date.getDate().toString() +
    "/" +
    date.getMonth().toString() +
    "/" +
    date.getFullYear().toString();

  const description = post.post.description;

  const numberOfLikes = post.likes.length;
  const numberOfComments = post.comments.length;
  const comments = post.comments;
  const imageUrl = post.post.imageUrl;

  const dateForComment = (value) => {
    value = new Date(value);

    const postedAt =
      value.getDate().toString() +
      "/" +
      value.getMonth().toString() +
      "/" +
      value.getFullYear().toString();

    return postedAt;
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar></Avatar>}
        title={<b>{postedBy}</b>}
        subheader={postedAt}
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
                        {dateForComment(comment.createdAt)}
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
          <TextField variant="standard" label="Add comment" fullWidth />

          <IconButton>
            <AddCommentOutlined />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Post;
