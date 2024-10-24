import { useState, useEffect } from "react";

import CurrentWeather from "@/components/CurrentWeather";
import DailySummary from "@/components/DailySummary";
import UserPreference from "@/components/UserPreference";

import { CITIES, TEMPERATURE_UNITS } from "@/utils/constant";
import useFetch from "@/hooks/useFetch";
import { convertTemperature } from "@/utils/convert-temprature";

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

interface EmailData {
  email: string;
  cityName: string;
  temperature: number;
  weatherCondition: string;
  feelsLike: number;
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

  const sendEmail = async (emailData: EmailData) => {
    const URL = `${import.meta.env.VITE_API_BASE_URL}/sendEmail`;
    console.log(URL);
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    return res.json();
  };

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

  useEffect(() => {
    const sendEmailNotifiaction = async () => {
      if (
        fetchedCurrentWeather &&
        localStorage.getItem("notification-preference") &&
        localStorage.getItem("email")
      ) {
        const userPreference = localStorage.getItem("notification-preference");
        const preferences = userPreference && JSON.parse(userPreference);

        for (const city of fetchedCurrentWeather.data) {
          const cityIndex = preferences.findIndex(
            (pref: { selectedCity: any }) => pref.selectedCity === city.city
          );

          if (cityIndex !== -1) {
            const temp =
              preferences[cityIndex].temperatureUnit === "Kelvin"
                ? preferences[cityIndex].temperatureUnit
                : convertTemperature(
                    city.temp,
                    preferences[cityIndex].temperatureUnit
                  );

            const feelsLike = convertTemperature(
              city.feels_like,
              preferences[cityIndex].temperatureUnit
            );

            const email = localStorage.getItem("email");

            if (preferences[cityIndex].threshold <= temp && email) {
              const emailData: EmailData = {
                email: email,
                temperature: temp,
                cityName: city.city,
                weatherCondition: city.main,
                feelsLike: feelsLike,
              };

              await sendEmail(emailData);
            }
          }
        }
      }
    };

    sendEmailNotifiaction();
  }, [fetchedCurrentWeather]);

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
