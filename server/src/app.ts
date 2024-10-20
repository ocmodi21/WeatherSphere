import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";

import logger from "./middlewares/logger/logger";
import cronjob from "./utils/cronjob";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Schedule the task to fetch weather data
// cron.schedule("*/10 * * * *", cronjob.fetchWeatherData);

// Schedule the task to roll up weather data
// cron.schedule("0 0 * * *", cronjob.fetchRollUpWeatherData);

cronjob.fetchRollUpWeatherData();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
