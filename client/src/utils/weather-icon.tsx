import { Sun, Cloud, CloudRain, CloudFog } from "lucide-react";

export const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case "Clear":
      return <Sun className="w-10 h-10 text-yellow-300" />;
    case "Clouds":
      return <Cloud className="w-10 h-10 text-blue-300" />;
    case "Rain":
      return <CloudRain className="w-10 h-10 text-blue-400" />;
    case "Haze":
    case "Mist":
    case "Smoke":
      return <CloudFog className="w-10 h-10 text-gray-400" />;
    default:
      return <Sun className="w-10 h-10 text-yellow-300" />;
  }
};
