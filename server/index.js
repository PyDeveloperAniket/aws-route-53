// Importing environment variables from .env file
import 'dotenv/config';

// Importing required dependencies
import express from "express";
import cors from "cors";

// Importing route handlers
import route from "./Routes/route.js";
import dnsRoutes from "./Routes/dnsRoutes.js";
import domainRoutes from "./Routes/domainRoutes.js";

// Importing AWS configuration
import configureAWS from './config/awsConfig.js'

// Creating an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(
    cors({
        origin: "*", // Allowing requests from all origins
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowing specified HTTP methods
        credentials: true // Allowing credentials to be included in CORS requests
    })
);

// Using route handlers for different paths
app.use("/", route); // Default route
app.use("/api/dns", dnsRoutes); // Route for DNS-related endpoints
app.use("/api/domain", domainRoutes); // Route for domain-related endpoints

// Setting up the server to listen on a port
const PORT = process.env.PORT || 8080; // Defaulting to port 8080 if not specified in the environment
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Logging server start message
});
