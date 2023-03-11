import axios from "axios";

const AUTH_API_URL = process.env.REACT_APP_BASE_API_URL + "auth/"

class AuthService {

    login(username, password) {

        return axios.post(AUTH_API_URL + "signin", {
            username,
            password
        })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstname, lastname, username, email, password) {
        return axios.post(AUTH_API_URL + "signup", {
            firstname,
            lastname,
            username,
            email,
            password
        }).then(response => { return response.data })
            .catch((err) => { console.log(err.response.data) });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

const authService = new AuthService();

export default authService;