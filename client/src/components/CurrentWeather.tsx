import { WeatherIcon } from "@/utils/weather-icon";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { formatTemperature } from "@/utils/format-temprature";
import { WeatherData } from "@/pages/Dashboard";

interface CurrentWeatherProps {
  selectedCity: string;
  temperatureUnit: string;
  currentWeather: WeatherData | null;
}

const CurrentWeather = ({
  selectedCity,
  temperatureUnit,
  currentWeather,
}: CurrentWeatherProps) => {
  if (!currentWeather) {
    return (
      <Card className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-gray-700 pb-6">
          <CardTitle className="text-2xl font-semibold text-purple-300">
            Current Weather in {selectedCity}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-gray-400">
            Weather data is not available at the moment.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
      <CardHeader className="border-b border-gray-700 pb-6">
        <CardTitle className="text-2xl font-semibold text-purple-300">
          Current Weather in {selectedCity}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-5xl font-bold text-blue-300">
              {formatTemperature(currentWeather.temp, temperatureUnit)}
            </p>
            <p className="text-gray-400 mt-2">
              Feels like{" "}
              {formatTemperature(currentWeather.feels_like, temperatureUnit)}
            </p>
            <p className="mt-4 text-xl text-gray-200">{currentWeather.main}</p>
            <p className="text-sm text-gray-400 mt-2">
              Last Updated:{" "}
              {new Date(currentWeather.dt * 1000).toLocaleString()}
            </p>
          </div>
          <WeatherIcon condition={currentWeather.main} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
