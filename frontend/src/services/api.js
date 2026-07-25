import axios from "axios";

// Sends the JWT token with every request
const api = axios.create({
    baseURL: "https://leaddesk-mini.onrender.com/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;