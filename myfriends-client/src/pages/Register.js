import { AccountBoxOutlined, EmailOutlined, KeyOutlined, PersonOutlineOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, TextField, Stack, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import IconTextField from "../components/IconTextField";

function Register() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                                    />

                                    <IconTextField
                                        label="Last Name"
                                        iconStart={<PersonOutlineOutlined />}
                                    />

                                    <IconTextField
                                        label="Username"
                                        iconStart={<AccountBoxOutlined />}
                                    />

                                    <IconTextField
                                        type={"email"}
                                        label="Email"
                                        iconStart={<EmailOutlined />}
                                    />

                                    <TextField
                                        id="password-field"
                                        variant="outlined"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
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
                                    <Button variant="contained">Register</Button>
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