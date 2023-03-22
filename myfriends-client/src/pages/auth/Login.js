import {
  KeyOutlined,
  PersonOutlineOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  FormControl,
  TextField,
  Stack,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../values/colors";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [requestFail, setRequestFail] = React.useState(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_BASE_API_URL + "auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setRequestFail(false);
        if (response.data.roles.includes("ROLE_ADMIN")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setRequestFail(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginErrorMessage = () => {
    return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>Error</AlertTitle>
        Credentials incorrect or user does not exist!
      </Alert>
    );
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ paddingTop: "10vh", height: "90vh" }}>
        <Stack spacing={2}>
          <Box
            sx={{
              border: "1px solid gray",
              p: "10%",
              backgroundColor: COLORS.white,
            }}
          >
            <Stack spacing={7}>
              <Box width="100%">
                <Typography
                  color={COLORS.textPrimary}
                  align="center"
                  variant="h4"
                >
                  <b>myFriends</b>
                </Typography>
              </Box>
              <FormControl sx={{ width: "100%" }}>
                <Stack spacing={2}>
                  <TextField
                    id="username-field"
                    variant="outlined"
                    label="Username"
                    onChange={(newValue) => setUsername(newValue.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    id="password-field"
                    variant="outlined"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={(newValue) => setPassword(newValue.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyOutlined />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleLogin();
                    }}
                    disabled={loading}
                    sx={{
                      backgroundColor: COLORS.primary,
                      "&:hover": { backgroundColor: "#3951A7" },
                    }}
                  >
                    Sign In
                  </Button>
                  {requestFail != null && requestFail
                    ? loginErrorMessage()
                    : null}
                </Stack>
              </FormControl>
            </Stack>
          </Box>

          <Box
            sx={{
              border: "1px solid gray",
              p: "5%",
              backgroundColor: COLORS.white,
            }}
          >
            <Typography align="center">
              Don't have an account?
              <Button
                href="./register"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#E2856E",
                  },
                  color: COLORS.primary,
                }}
                variant="text"
              >
                Register
              </Button>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

export default Login;
