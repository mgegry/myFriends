import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
            <>
                <div>Home</div>
                <Button onClick={() => { localStorage.removeItem('user'); }} >Fuata</Button>
            </>
        );
    }
}

export default Home;