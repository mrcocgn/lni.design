import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/models", modelRoutes);
app.use("/api/content", contentRoutes);

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
