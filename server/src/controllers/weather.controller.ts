import { Request, Response } from "express";
import WeatherModel from "../models/weather.model";

class WeatherController {
  async getCurrentWeatherData(req: Request, res: Response): Promise<any> {
    try {
      // Aggregate to get the latest weather entries for each city
      const latestWeatherEntries = await WeatherModel.aggregate([
        {
          $sort: { dt: -1 }, // Sort by timestamp in descending order
        },
        {
          $group: {
            _id: "$city",
            latestEntry: { $first: "$$ROOT" }, // Get the first entry for each city
          },
        },
        {
          $replaceRoot: { newRoot: "$latestEntry" }, // Replace root with latest entry
        },
      ]);

      if (latestWeatherEntries.length === 0) {
        return res.status(404).json({ message: "No weather data found." });
      }

      // Respond with the latest entries
      return res.status(200).json({
        message: "Latest weather data.",
        data: latestWeatherEntries,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while fetching the weather data.",
        error: error,
      });
    }
  }
}

export default new WeatherController();
