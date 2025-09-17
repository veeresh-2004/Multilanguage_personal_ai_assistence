import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ Use CLIENT_URL from environment variables
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Default allowed origins for development
    const defaultOrigins = [
      "https://loanmate-platform.vercel.app",
      "capacitor://localhost",
      "http://localhost",
      "ionic://localhost", 
      "file://",
      "http://localhost:3000",
      "http://localhost:5173",
    ];
    
    // Combine environment origins with defaults
    const allAllowedOrigins = [...allowedOrigins, ...defaultOrigins];
    
    // Check if origin is allowed
    if (allAllowedOrigins.includes(origin) || 
        origin?.startsWith('capacitor://') || 
        origin?.startsWith('ionic://') ||
        origin?.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow all for now during testing
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// ✅ Add health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running", 
    timestamp: new Date(),
    allowedOrigins: allowedOrigins 
  });
});

app.get("/", (req, res) => res.send("API running"));
app.use("/api/auth", authRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.log("DB connection error:", err));
