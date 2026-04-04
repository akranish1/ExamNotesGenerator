import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/connectDb.js';
import validateEnv from './config/validateEnv.js';
import authRouter from './routes/auth.route.js';
import notesRouter from "./routes/genrate.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import pdfRouter from './routes/pdf.route.js';
import creditRouter from './routes/credits.route.js';
import { stripeWebhook } from './controllers/credits.controller.js';
dotenv.config();

// Validate environment variables before starting
validateEnv();

const app = express();

// Stripe webhook must be before express.json()
app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(cors(
    {origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    }
));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Health check endpoint
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("❌ Error:", err);
    res.status(err.status || 500).json({ 
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { error: err })
    });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    console.error("❌ Uncaught Exception:", error);
    process.exit(1);
});

const server = app.listen(PORT, async () => {
    console.log(`🚀 Server is running on PORT ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    await connectDb();
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("📢 SIGTERM received, shutting down gracefully...");
    server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
    });
});