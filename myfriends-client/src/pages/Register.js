import { AccountBoxOutlined, EmailOutlined, KeyOutlined, PersonOutlineOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, TextField, Stack, Button, Typography, InputAdornment, IconButton, Alert, AlertTitle } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import IconTextField from "../components/IconTextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validation from "../services/validation";

function Register() {

    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [validFirstname, setValidFirstName] = React.useState([true, ""]);
    const [validLastname, setValidLastName] = React.useState([true, ""]);
    const [validUsername, setValidUsername] = React.useState([true, ""]);
    const [validEmail, setValidEmail] = React.useState([true, ""]);
    const [validPassword, setValidPassword] = React.useState([true, ""]);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [requestFail, setRequestFail] = React.useState(null);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const validateData = () => {

        if (!validation.validateLength(firstname, 3, 30)) {
            setValidFirstName([false, "First name has to be between 3 and 30 characters!"]);
            return false;
        } else {
            setValidFirstName([true, ""]);
        }

        if (!validation.validateLength(lastname, 3, 30)) {
            setValidLastName([false, "Last name has to be between 3 and 30 characters!"]);
            return false;
        } else {
            setValidLastName([true, ""]);
        }

        if (!validation.validateLength(username, 3, 30)) {
            setValidUsername([false, "Username has to be between 3 and 30 characters!"]);
            return false;
        } else {
            setValidUsername([true, ""]);
        }

        if (!validation.validateEmail(email)) {
            setValidEmail([false, "Not a valid email address!"]);
            return false;
        } else {
            setValidEmail([true, ""]);
        }

        if (!validation.validateLength(password, 6, 30)) {
            setValidPassword([false, "Password has to be between 6 and 120 characters!"]);
            return false;
        } else {
            setValidPassword([true, ""]);
        }

        return true;

    }

    const handleRegister = () => {
        setLoading(true);

        if (validateData()) {

            axios
                .post(process.env.REACT_APP_BASE_API_URL + "auth/signup", {
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                })
                .then((response) => {
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
        } else {
            setLoading(false);
        }
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
                                        onChange={(newValue) => {
                                            let value = newValue.target.value
                                            setFirstName(validation.cleanValue(value));
                                        }}
                                        error={!validFirstname[0]}
                                        helperText={validFirstname[0] === false ? validFirstname[1] : null}
                                    />

                                    <IconTextField
                                        label="Last Name"
                                        iconStart={<PersonOutlineOutlined />}
                                        onChange={(newValue) => {
                                            let value = newValue.target.value
                                            setLastName(validation.cleanValue(value));
                                        }}
                                        error={!validLastname[0]}
                                        helperText={validLastname[0] === false ? validLastname[1] : null}
                                    />

                                    <IconTextField
                                        label="Username"
                                        iconStart={<AccountBoxOutlined />}
                                        onChange={(newValue) => {
                                            let value = newValue.target.value
                                            setUsername(validation.cleanValue(value));
                                        }}
                                        error={
                                            requestFail != null && requestFail !== false
                                                ? error.response.data['field-error'] === "username"
                                                : !validUsername[0]
                                        }

                                        helperText={
                                            (requestFail != null && requestFail !== false)
                                                ? error.response.data['field-error'] === "username"
                                                    ? error.response.data['message']
                                                    : null
                                                : validUsername[0] === false ? validUsername[1] : null
                                        }
                                    />

                                    <IconTextField
                                        type={"email"}
                                        label="Email"
                                        iconStart={<EmailOutlined />}
                                        onChange={(newValue) => {
                                            let value = newValue.target.value
                                            setEmail(validation.cleanValue(value));
                                        }}
                                        error={
                                            requestFail != null && requestFail !== false
                                                ? error.response.data['field-error'] === "email"
                                                : !validEmail[0]
                                        }
                                        helperText={
                                            requestFail != null && requestFail !== false
                                                ? error.response.data['field-error'] === "email"
                                                    ? error.response.data['message']
                                                    : null
                                                : validEmail[0] === false ? validEmail[1] : null
                                        }
                                    />

                                    <TextField
                                        id="password-field"
                                        variant="outlined"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(newValue) => { setPassword(validation.cleanValue(newValue.target.value)) }}

                                        error={!validPassword[0]}
                                        helperText={validPassword[0] === false ? validPassword[1] : null}

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
                                    {
                                        requestFail != null
                                            ? (requestFail)
                                                ? reigsterFailed()
                                                : registerSuccess()
                                            : null
                                    }
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