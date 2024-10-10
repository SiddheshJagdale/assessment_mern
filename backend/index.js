import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Routes/Router.js"; // Ensure your Router.js file is correctly imported

dotenv.config();
const port = process.env.PORT;
const mongoDBurl = process.env.MONGO_DB_URL;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router); // Use the router that contains all your routes

// Connect to MongoDB
mongoose.connect(mongoDBurl).then(() => {
  console.log("DB connection successful");
});

// Start the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
