require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

connectDB();

app.use(cors({
    origin: "https://blog-platform-1jsn.vercel.app",
    credentials: true,
  }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Blog API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
