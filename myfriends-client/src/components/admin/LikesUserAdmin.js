import { Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authHeader from "../../services/authentication/auth-header";
import PostCard from "./PostCard";

const LikesUserAdmin = () => {
  const [posts, setPosts] = useState([]);

  const { userId } = useParams();

  const config = {
    headers: authHeader(),
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_API_URL + `admin/likes?userId=${userId}`,
        config
      )
      .then((response) => {
        setPosts(response.data);
      });
  }, []);

  return (
    <Stack spacing={2}>
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            postEntity={post}
            posts={posts}
            setPosts={setPosts}
          />
        );
      })}
    </Stack>
  );
};

export default LikesUserAdmin;
