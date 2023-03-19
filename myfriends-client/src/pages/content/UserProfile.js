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
import { useParams } from "react-router-dom";
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

const UserProfile = () => {
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const [friendsNb, setFriendsNb] = React.useState([]);
  const [requestUser, setRequestUser] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: authHeader(),
  };

  const { username } = useParams();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + `${username}/posts`, config)
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + `${username}`, config)
      .then((response) => {
        setRequestUser(response.data);
        axios
          .get(
            process.env.REACT_APP_BASE_API_URL +
              `${response.data.id}/friends/number`,
            config
          )
          .then((response) => {
            setFriendsNb(response.data.numberOfFriends);
          })
          .catch((err) => {})
          .finally(() => {});
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  useEffect(() => {}, []);

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
                    <b>{requestUser.username}</b>
                  </Typography>

                  <Stack direction={"row"} spacing={5}>
                    <Typography>{posts.length} Posts</Typography>
                    <Typography>{friendsNb} Friends</Typography>
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
          </Box>
        </Stack>
      </Container>
    </Grid>
  );
};
export default UserProfile;
