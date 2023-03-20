import { Avatar, Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";
import authHeader from "../../services/authentication/auth-header";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [displayContent, setDisplayContent] = useState("");
  const [displaySearch, setDisplaySearch] = useState("none");

  const config = {
    headers: authHeader(),
  };

  const navigate = useNavigate();

  const handleUserProfile = (user) => {
    navigate(`/${user}`);
  };

  const handleOnChange = (event) => {
    if (event.target.value.length > 3) {
      axios
        .get(
          process.env.REACT_APP_BASE_API_URL + `search/${event.target.value}`,
          config
        )
        .then((response) => {
          if (response.data.length > 0) {
            setDisplayContent("none");
            setDisplaySearch("");
          }

          setSearchResult(response.data);
          console.log(response.data);
        });
    } else {
      setDisplayContent("");
      setSearchResult([]);
    }
  };

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
        <SearchBar barWidth="50%" handleOnChange={handleOnChange} />

        <Stack sx={{ width: "35%" }} spacing={3} display={displayContent}>
          {posts.map((post) => {
            return <Post key={post.post.id} postEntity={post} />;
          })}
        </Stack>

        <Paper
          sx={{
            width: "55%",
            maxHeight: "80vh",
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
            padding: "20px",
          }}
          elevation={3}
          display={displaySearch}
        >
          <List sx={{ padding: "20px" }}>
            {searchResult.map((user) => {
              return (
                <Paper
                  key={user.id}
                  elevation={2}
                  sx={{ padding: "20px", marginBottom: 1 }}
                >
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack
                      direction={"row"}
                      sx={{ alignItems: "center", cursor: "pointer" }}
                      spacing={2}
                      onClick={() => {
                        handleUserProfile(user.username);
                      }}
                    >
                      <Avatar></Avatar>
                      <Typography>
                        <b>{user.username}</b>
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </List>
        </Paper>
      </Stack>
    </Grid>
  );
};

export default Home;
