import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../../../components/admin/PostCard";
import SearchBar from "../../../components/SearchBar";
import authHeader from "../../../services/authentication/auth-header";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [copyPosts, setCopyPosts] = useState([]);

  const config = {
    headers: authHeader(),
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + `admin/posts`, config)
      .then((response) => {
        setPosts(response.data);
        setCopyPosts(response.data);
      });
  }, []);

  const handleOnSearchChange = (event) => {
    const searchValue = event.target.value.replace(/\s/g, "");

    if (searchValue.length > 0) {
      var copy = [...posts];
      copy = copy.filter((p) => {
        return (
          p.user.username.includes(searchValue) ||
          p.user.firstName.includes(searchValue) ||
          p.user.lastName.includes(searchValue) ||
          p.user.email.includes(searchValue) ||
          p.description.includes(searchValue)
        );
      });

      setPosts(copy);
    } else {
      setPosts(copyPosts);
    }
  };

  return (
    <Stack spacing={2}>
      <SearchBar barWidth={"100%"} handleOnChange={handleOnSearchChange} />
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

export default PostList;
