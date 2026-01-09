import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import dotenv from "dotenv";
import connectDB from "./database.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors('*'));
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
