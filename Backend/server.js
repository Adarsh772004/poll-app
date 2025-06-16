const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 2000;

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from Node.js backend!");
});

// API Routes
app.use("/poll/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
