import { ReportProblemOutlined } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";

const Unauthorized = () => {
    return (
        <Grid container sx={{ height: "100vh" }} alignItems="center">
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
                <Stack direction={"column"} spacing={1}>
                    <Alert
                        icon={false}
                        severity="info"
                        sx={{ height: "35vh", fontSize: "2rem" }}
                    >
                        <Stack direction={"row"} spacing={2} sx={{ alignItems: "baseline" }}>
                            <ReportProblemOutlined sx={{ fontSize: "2rem" }} />
                            <AlertTitle sx={{ fontSize: "3rem" }} ><b>401</b> Unauthorized</AlertTitle>
                        </Stack>
                        <h4>
                            You are not allowed to access the requested resource.
                        </h4 >

                    </Alert>

                    <Button href="./login" variant="outlined">Back to login</Button>

                </Stack>

            </Grid>
            <Grid item xs={2}>
            </Grid>
        </Grid>
    );
};

export default Unauthorized;