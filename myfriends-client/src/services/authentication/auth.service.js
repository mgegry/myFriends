import axios from "axios";

const AUTH_API_URL = process.env.REACT_APP_BASE_API_URL + "/api/auth"

class AuthService {

    login(username, password) {

        return axios.post(AUTH_API_URL + "/signin", {
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

    register(username, email, password) {
        return axios.post(AUTH_API_URL + "/signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

const authService = new AuthService();

export default authService;