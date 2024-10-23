import { Router } from "express";
import weatherController from "../controllers/weather.controller";

const router = Router();

router.get("/currentWeather", weatherController.getCurrentWeatherData);
router.get("/weatherSummary", weatherController.getWeatherSummaryData);
router.get("/sendEmail", weatherController.sendEmail);

export default router;
