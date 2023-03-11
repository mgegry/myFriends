import { Button } from "@mui/material";
import React, { useEffect } from "react";

const Home = () => {

    const [authenticated, setAuthenticated] = React.useState(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        if (loggedInUser) {
            setAuthenticated(loggedInUser);
        }
    }, [])


    if (authenticated) {
        return (
            <>
                <div>Home</div>
                <Button onClick={() => { localStorage.removeItem('user'); }} >Fuata</Button>
            </>
        );
    } else {
        return <div>You need to be logged in to access this resource</div>
    }
}

export default Home;