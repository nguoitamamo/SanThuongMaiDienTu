import axios from "axios"; // Nếu dùng Node.js hoặc React

const San_HNTClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 10000, 
    headers: { "Content-Type": "application/json" }
});

