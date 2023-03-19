import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import authHeader from "../../services/authentication/auth-header";
import dateUtils from "../../utils/dateUtils";
import stringUtils from "../../utils/stringUtils";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [requestUser, setRequestUser] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: authHeader(),
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_API_URL + `${user.username}/posts`,
        config
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_API_URL + `${user.username}/friends`,
        config
      )
      .then((response) => {
        setFriends(response.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + `${user.username}`, config)
      .then((response) => {
        setRequestUser(response.data);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  const handleDeleteFriend = (friendUsername, index) => {
    // TODO: add : IF SOBODY ELSE DONT PRINT OR ALLOW THE BUTTON TO BE SEEN
    axios
      .delete(
        process.env.REACT_APP_BASE_API_URL +
          `${user.username}/friends/${friendUsername}`,
        config
      )
      .then((response) => {
        var copy = [...friends];
        copy.splice(index, 1);
        setFriends(copy);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Container maxWidth="md">
        <Stack sx={{ width: "100%", alignItems: "" }} spacing={5}>
          {/* Profile info */}
          <Paper sx={{ padding: "20px", minHeight: "17vh" }}>
            <Stack direction={"row"} spacing={10}>
              <Avatar sx={{ width: 150, height: 150 }}></Avatar>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography fontSize={20}>
                    <b>{user.username}</b>
                  </Typography>

                  <Stack direction={"row"} spacing={5}>
                    <Typography>{posts.length} Posts</Typography>
                    <Typography>{friends.length} Friends</Typography>
                  </Stack>
                </Stack>

                <Stack spacing={1}>
                  <Typography>
                    <b>
                      {requestUser !== null
                        ? stringUtils.capitalizeFirstLetter(
                            requestUser.firstName
                          ) +
                          " " +
                          stringUtils.capitalizeFirstLetter(
                            requestUser.lastName
                          )
                        : ""}
                    </b>
                  </Typography>
                  <Typography>
                    {requestUser !== null ? (
                      requestUser.bio !== null ? (
                        requestUser.bio
                      ) : (
                        <i>"No bio was set"</i>
                      )
                    ) : (
                      ""
                    )}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>

          {/* Profile content */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
              >
                <Tab label="Posts" {...a11yProps(0)} />
                <Tab label="Friends" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ImageList cols={3}>
                {posts.map((post) => {
                  return (
                    <ImageListItem
                      key={post.id}
                      sx={{ border: "1px solid gray" }}
                    >
                      <img src={post.imageUrl} alt={"imageTitle"} />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {friends.map((friend, index) => {
                return (
                  <Paper
                    elevation={2}
                    key={friend.id}
                    sx={{ padding: "20px", marginBottom: 1 }}
                  >
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack
                        direction={"row"}
                        sx={{ alignItems: "center" }}
                        spacing={2}
                      >
                        <Avatar></Avatar>
                        <Typography>
                          <b>{friend.username}</b>
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} alignItems="center" spacing={2}>
                        <Stack direction={"row"} spacing={1}>
                          <Typography>Friends since:</Typography>
                          <Typography>
                            {dateUtils.getDate(friend.createdAt)}
                          </Typography>
                        </Stack>
                        <IconButton
                          onClick={() => {
                            handleDeleteFriend(friend.username, index);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Paper>
                );
              })}
            </TabPanel>
          </Box>
        </Stack>
      </Container>
    </Grid>
  );
};
export default Profile;
