import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeView from "../components/HomeView";
import Navigation from "../components/Navigation";
import { COLORS } from "../values/colors";

const Home = () => {

    const [authenticated, setAuthenticated] = React.useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        if (loggedInUser) {
            setAuthenticated(loggedInUser);
        } else {
            navigate("/unauthorized");
        }
    }, [navigate])


    if (authenticated) {

        return (
            <Grid container sx={{ height: "100vh" }}>

                <Grid item xs={2} sx={{ paddingTop: "1vh", backgroundColor: COLORS.white }} >
                    <Grid container>
                        <Navigation />
                    </Grid>
                </Grid>
                <Grid
                    item xs={10}
                    sx={{
                        borderLeft: "1px solid gray",
                        paddingTop: "1vh",
                        backgroundColor: `${COLORS.secondary}`
                    }}>

                    <HomeView />

                </Grid>
            </Grid >
        );
    }
}

export default Home;