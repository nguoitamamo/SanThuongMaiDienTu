import axios from "axios";

export const endpoints = {
    products: "/products/",
    users: "/users/", 
    permissions: "/permissions/",
    categories: "/categories/"
};

const API = axios.create({
    baseURL: "http://192.168.1.155:8000",
});

export default API;
