import { useState, useEffect } from "react";

import CurrentWeather from "@/components/CurrentWeather";
import DailySummary from "@/components/DailySummary";
import UserPreference from "@/components/UserPreference";

import { CITIES, TEMPERATURE_UNITS } from "@/utils/constant";
import useFetch from "@/hooks/useFetch";

export interface WeatherData {
  city: string;
  dt: number;
  feels_like: number;
  main: string;
  temp: number;
}

export interface WeatherSummary {
  city: string;
  day: string;
  avg_temprature: number;
  min_temprature: number;
  max_temprature: number;
  dominant: string;
}

export default function WeatherDashboard() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [weatherSummaries, setWeatherSummaries] = useState<WeatherSummary[]>(
    []
  );
  const [temperatureUnit, setTemperatureUnit] = useState(TEMPERATURE_UNITS[0]);

  const { data: fetchedCurrentWeather } = useFetch("currentWeather");
  const { data: fetchedWeatherSummary } = useFetch("weatherSummary");

  useEffect(() => {
    if (fetchedCurrentWeather) {
      setCurrentWeather(
        fetchedCurrentWeather.data.find(
          (item: WeatherData) => item.city === selectedCity
        ) || null
      );
    }

    if (fetchedWeatherSummary) {
      setWeatherSummaries(fetchedWeatherSummary.data);
    }
  }, [selectedCity, fetchedCurrentWeather, fetchedWeatherSummary]);

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

        {weatherSummaries && (
          <DailySummary
            selectedCity={selectedCity}
            temperatureUnit={temperatureUnit}
            weatherSummaries={weatherSummaries}
          />
        )}
      </div>
    </div>
  );
}
