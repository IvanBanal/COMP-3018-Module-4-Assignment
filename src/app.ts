import express, { Express } from "express";
import morgan from "morgan";
import loanRoutes from "../src/api/v1/routes/loanRoutes";
import adminRoutes from "../src/api/v1/routes/adminRoutes";

// Initialize Express application.
const app: Express = express();


// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Body parsing middleware.
app.use(express.json());


// Define a route.
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Health Check.
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// API Routes.


export default app;
