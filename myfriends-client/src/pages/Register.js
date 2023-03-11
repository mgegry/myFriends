import { AccountBoxOutlined, EmailOutlined, KeyOutlined, PersonOutlineOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, TextField, Stack, Button, Typography, InputAdornment, IconButton, Alert, AlertTitle } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import IconTextField from "../components/IconTextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [requestFail, setRequestFail] = React.useState(null);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const handleRegister = () => {
        setLoading(true);
        axios
            .post(process.env.REACT_APP_BASE_API_URL + "auth/signup", {
                firstname,
                lastname,
                username,
                email,
                password,
            })
            .then((response) => {
                setData(response.data);
                setRequestFail(false);
                setTimeout(() => { navigate("/login"); }, 1000);
            })
            .catch((err) => {
                setError(err);
                setRequestFail(true);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    const reigsterFailed = () => {
        return (
            <Alert severity="error" variant="outlined" >
                <AlertTitle>Error</AlertTitle>
                Account failed to register!
            </Alert>
        );
    }

    const registerSuccess = () => {
        return (
            <Alert severity="success" variant="outlined">
                <AlertTitle>Succes</AlertTitle>
                Account created!
            </Alert>
        )
    }


    return (
        <Container maxWidth="sm">

            <Box sx={{ padding: "5%", height: "100vh" }}>
                <Stack spacing={2}>
                    <Box sx={{ border: "1px solid black", p: "10%" }}>

                        <Stack spacing={7}>
                            <Box width="100%">
                                <Typography align="center" variant="h4">myFriends</Typography>
                            </Box>
                            <FormControl sx={{ width: "100%" }}>
                                <Stack spacing={2}>
                                    <IconTextField
                                        label="First Name"
                                        iconStart={<PersonOutlineOutlined />}
                                        setFieldValueMethod={setFirstName}
                                    />

                                    <IconTextField
                                        label="Last Name"
                                        iconStart={<PersonOutlineOutlined />}
                                        setFieldValueMethod={setLastName}
                                    />

                                    <IconTextField
                                        label="Username"
                                        iconStart={<AccountBoxOutlined />}
                                        setFieldValueMethod={setUsername}
                                        error={requestFail != null && requestFail !== false ? error.response.data['field-error'] === "username" : false}

                                        helperText={
                                            requestFail != null && requestFail !== false
                                                ? error.response.data['field-error'] === "username"
                                                    ? error.response.data['message']
                                                    : null
                                                : null
                                        }
                                    />

                                    <IconTextField
                                        type={"email"}
                                        label="Email"
                                        iconStart={<EmailOutlined />}
                                        setFieldValueMethod={setEmail}
                                        error={requestFail != null && requestFail !== false ? error.response.data['field-error'] === "email" : false}
                                        helperText={
                                            requestFail != null && requestFail !== false
                                                ? error.response.data['field-error'] === "email"
                                                    ? error.response.data['message']
                                                    : ""
                                                : ""
                                        }
                                    />

                                    <TextField
                                        id="password-field"
                                        variant="outlined"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(newValue) => { setPassword(newValue.target.value) }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyOutlined />
                                                </InputAdornment>),
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



                                    <Button onClick={() => { handleRegister() }} variant="contained" disabled={loading} >Register</Button>
                                    {requestFail != null ? requestFail ? reigsterFailed() : registerSuccess() : null}
                                </Stack>
                            </FormControl>
                        </Stack>
                    </Box>

                    <Box sx={{ border: "1px solid black", p: "5%" }}>
                        <Typography align="center">Already Registered?
                            <Button href="./login" sx={{ "&:hover": { backgroundColor: "transparent" } }} variant="text">
                                Sign in
                            </Button>
                        </Typography>

                    </Box>
                </Stack>
            </Box>

        </Container >
    );
}

export default Register;