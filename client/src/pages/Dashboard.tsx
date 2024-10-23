import { useState, useEffect } from "react";

import CurrentWeather from "@/components/CurrentWeather";
import DailySummary from "@/components/DailySummary";
import UserPreference from "@/components/UserPreference";

import { CITIES, TEMPERATURE_UNITS } from "@/utils/constant";

export interface WeatherData {
  main: string;
  temp: number;
  feels_like: number;
  dt: number;
}

export interface DailySummaryData {
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  dominantCondition: string;
}

// Static weather data for each city (in Celsius)
const STATIC_WEATHER_DATA: { [key: string]: WeatherData } = {
  Delhi: { main: "Clear", temp: 32, feels_like: 34, dt: Date.now() / 1000 },
  Mumbai: { main: "Clouds", temp: 29, feels_like: 32, dt: Date.now() / 1000 },
  Chennai: { main: "Rain", temp: 27, feels_like: 29, dt: Date.now() / 1000 },
  Bangalore: { main: "Haze", temp: 24, feels_like: 25, dt: Date.now() / 1000 },
  Kolkata: { main: "Clouds", temp: 30, feels_like: 33, dt: Date.now() / 1000 },
  Hyderabad: { main: "Clear", temp: 31, feels_like: 33, dt: Date.now() / 1000 },
};

// Static daily summaries for demonstration (in Celsius)
const STATIC_DAILY_SUMMARIES: DailySummaryData[] = [
  {
    date: "2023-06-01",
    avgTemp: 30,
    maxTemp: 35,
    minTemp: 25,
    dominantCondition: "Clear",
  },
  {
    date: "2023-06-02",
    avgTemp: 29,
    maxTemp: 33,
    minTemp: 24,
    dominantCondition: "Clouds",
  },
  {
    date: "2023-06-03",
    avgTemp: 28,
    maxTemp: 32,
    minTemp: 23,
    dominantCondition: "Rain",
  },
  {
    date: "2023-06-04",
    avgTemp: 31,
    maxTemp: 36,
    minTemp: 26,
    dominantCondition: "Clear",
  },
  {
    date: "2023-06-05",
    avgTemp: 30,
    maxTemp: 34,
    minTemp: 25,
    dominantCondition: "Haze",
  },
];

export default function WeatherDashboard() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [dailySummaries, setDailySummaries] = useState<DailySummaryData[]>(
    STATIC_DAILY_SUMMARIES
  );
  const [temperatureUnit, setTemperatureUnit] = useState(TEMPERATURE_UNITS[0]);

  useEffect(() => {
    setCurrentWeather(STATIC_WEATHER_DATA[selectedCity]);
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-8 md:px-6 lg:px-16 xl:px-40">
      <div className="container mx-auto p-4 space-y-6">
        <UserPreference
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          temperatureUnit={temperatureUnit}
          setTemperatureUnit={setTemperatureUnit}
        />

        {currentWeather && (
          <CurrentWeather
            selectedCity={selectedCity}
            temperatureUnit={temperatureUnit}
            currentWeather={currentWeather}
          />
        )}

        <DailySummary
          temperatureUnit={temperatureUnit}
          dailySummaries={dailySummaries}
        />
      </div>
    </div>
  );
}
