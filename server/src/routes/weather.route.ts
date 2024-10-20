import { Router } from "express";
import weatherController from "../controllers/weather.controller";

const router = Router();

router.get("/currentWeather", weatherController.getCurrentWeatherData);

export default router;
