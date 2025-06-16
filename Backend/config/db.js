const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connection successfully");
  } catch (error) {
    console.error("MongoD connection failed.", error);
    process.exit(1);
  }
};

module.exports = connectDB;
