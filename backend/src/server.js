const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors"); // 👈 add this

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const workspaceRoutes = require("./routes/workspace.routes");


dotenv.config();

const app = express();

// 🔥 CORS setup (IMPORTANT)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/workspaces", workspaceRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on ${process.env.PORT || 5000}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});