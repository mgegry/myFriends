import { Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authHeader from "../../services/authentication/auth-header";
import PostCard from "./PostCard";

const PostsUserAdmin = () => {
  const [posts, setPosts] = useState([]);

  const { userId } = useParams();

  const config = {
    headers: authHeader(),
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + `admin/posts/${userId}`, config)
      .then((response) => {
        setPosts(response.data);
      });
  }, []);

  return (
    <Stack spacing={2}>
      {posts.map((post) => {
        return <PostCard key={post.id} postEntity={post} />;
      })}
    </Stack>
  );
};

export default PostsUserAdmin;
