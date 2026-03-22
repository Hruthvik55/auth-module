import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/auth", authRoutes);

// ✅ ADD ERROR HANDLING HERE
mongoose.connect(process.env.MONGO_URI!)
.then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server running");
    });
})
.catch((err) => {
    console.log("DB ERROR:", err.message);
});