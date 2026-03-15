import express, { Express } from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import morgan from "morgan";
import loanRoutes from "../src/api/v1/routes/loanRoutes";
import adminRoutes from "../src/api/v1/routes/adminRoutes";

// Initialize Express application.
const app: Express = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

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
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/admin", adminRoutes);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;
