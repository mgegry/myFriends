import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";
import authHeader from "../../services/authentication/auth-header";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const config = {
      headers: authHeader(),
    };

    axios
      .get("http://localhost:8080/api/wall", config)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  return (
    <Grid container>
      <Stack sx={{ width: "100%", alignItems: "center" }} spacing={5}>
        <SearchBar />
        <Stack sx={{ width: "35%" }} spacing={3}>
          {posts.map((post) => {
            return <Post key={post.post.id} postEntity={post} />;
          })}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Home;
