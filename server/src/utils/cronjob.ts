import { PrismaClient } from "@prisma/client";

import WeatherModel from "../models/weather.model";
import { CITIES } from "./cities";

const prisma = new PrismaClient();

class CronjobManager {
  async fetchWeatherData() {
    const baseUrl = process.env.BASE_URL as string;
    const key = process.env.OPEN_WEATHER_API_KEY as string;

    try {
      for (const city of CITIES) {
        // api call
        const url = `${baseUrl}/weather?q=${city}&appid=${key}`;
        const data = await fetch(url);
        const weatherData = await data.json();

        // create object
        const newWeatherData = {
          city: weatherData.name,
          main: weatherData.weather[0].main,
          temp: weatherData.main.temp,
          feels_like: weatherData.main.feels_like,
          dt: weatherData.dt,
        };

        // Insert the weather data for the current city into the database
        await WeatherModel.create(newWeatherData);
      }
    } catch (error) {
      console.error("Error while fetching city's weather data:", error);
    }
  }

  async fetchRollUpWeatherData() {
    const date = new Date();
  
  // Set the date to one day before the current date
  date.setDate(date.getDate() - 1);

  // Define start and end of the previous day
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    try {
      for (const city of CITIES) {
        const stats = await WeatherModel.aggregate([
          {
            $match: {
              city: city,
              createdAt: { $gte: startOfDay, $lte: endOfDay },
            },
          },
          {
            $group: {
              _id: {
                day: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                city: "$city",
              },
              avgTemp: { $avg: "$temp" },
              maxTemp: { $max: "$temp" },
              minTemp: { $min: "$temp" },
              conditions: { $push: "$main" },
              createdAt: { $first: "$createdAt" },
            },
          },
          {
            $unwind: "$conditions",
          },
          {
            $group: {
              _id: {
                day: "$_id.day",
                city: "$_id.city",
                main: "$conditions",
              },
              count: { $sum: 1 },
              avgTemp: { $first: "$avgTemp" },
              maxTemp: { $first: "$maxTemp" },
              minTemp: { $first: "$minTemp" },
              createdAt: { $first: "$createdAt" },
            },
          },
          {
            $sort: { count: -1 },
          },
          {
            $group: {
              _id: {
                day: "$_id.day",
                city: "$_id.city",
              },
              avgTemp: { $first: "$avgTemp" },
              maxTemp: { $first: "$maxTemp" },
              minTemp: { $first: "$minTemp" },
              dominantWeather: { $first: "$_id.main" },
              createdAt: { $first: "$createdAt" },
            },
          },
        ]);

        if (stats.length > 0) {
          const data = {
            city: stats[0]._id.city,
            avg_temprature: stats[0].avgTemp,
            max_temprature: stats[0].maxTemp,
            min_temprature: stats[0].minTemp,
            dominant: stats[0].dominantWeather,
            day: stats[0].createdAt,
          };

          try {
            await prisma.weatherSummary.create({ data });
          } catch (prismaError) {
            console.error(
              `Error while saving weather data for city: ${city}`,
              prismaError
            );
          }
        } else {
          console.warn(
            `No weather data found for city: ${city} on ${
              startOfDay.toISOString().split("T")[0]
            }`
          );
        }
      }
    } catch (error) {
      console.error("Error while fetching city's weather data:", error);
    }
  }
}

export default new CronjobManager();
