import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/login' element={<Login />}> </Route>
                <Route exact path='/register' element={<Register />}> </Route>
                <Route exact path="/" element={<Home />}> </Route>
                <Route exact path="/unauthorized" element={<Unauthorized />}> </Route>
            </Routes>
        </BrowserRouter>
    );
};