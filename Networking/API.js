import axios from "axios";

export const endpoints = {
    products: "/products/",
    users: "/users/", 
    permissions: "/permissions/",
    categorys: "/categorys/",
    suppliers: "/suppliers/",
    comments: "/comments/",
};

const API = axios.create({
    baseURL: "http://192.168.1.154:8000",
});

export default API;
