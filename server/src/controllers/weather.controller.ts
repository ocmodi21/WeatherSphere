import { Request, Response } from "express";
import { PrismaClient, WeatherSummary } from "@prisma/client";

import WeatherModel from "../models/weather.model";

const prisma = new PrismaClient();

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
      // Handle any unexpected errors
      return res.status(500).json({
        message: "An error occurred while fetching the weather data.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getWeatherSummaryData(req: Request, res: Response): Promise<any> {
    try {
      // Fetch the latest max 'day' for each city from the WeatherSummary model
      const latestWeatherData = await prisma.weatherSummary.groupBy({
        by: ["city"],
        _max: {
          day: true,
        },
      });

      // Check if there is any data retrieved
      if (latestWeatherData.length === 0) {
        return res.status(404).json({
          message: "No weather data found.",
        });
      }

      // Get the latest weather entries for each city
      const latestEntries = await Promise.all(
        latestWeatherData.map(async (entry) => {
          if (entry._max.day) {
            // Fetch the latest entry for the city based on the maximum day
            try {
              return await prisma.weatherSummary.findFirst({
                where: {
                  city: entry.city,
                  day: entry._max.day,
                },
              });
            } catch (findError) {
              // Log error and return a null entry if there's an issue fetching
              console.error(
                `Error fetching data for city ${entry.city}:`,
                findError
              );
              return null;
            }
          }
          return null; // If the max day is null, return null
        })
      );

      // Filter out null results (in case of any errors in fetching specific entries)
      const filteredEntries = latestEntries.filter(
        (entry): entry is WeatherSummary | null => entry !== null
      );

      // Check if any valid entries were found
      if (filteredEntries.length === 0) {
        return res.status(404).json({
          message: "No valid weather data entries found.",
        });
      }

      // Return the latest weather entries
      return res.status(200).json({
        message: "Latest weather data retrieved successfully.",
        data: filteredEntries,
      });
    } catch (error) {
      // Handle any unexpected errors
      return res.status(500).json({
        message: "An error occurred while fetching the weather data.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export default new WeatherController();
