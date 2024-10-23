import { CITIES, TEMPERATURE_UNITS } from "@/utils/constant";
import { NotificationSettings } from "./NotificationSettings";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface UserPreferenceProps {
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  temperatureUnit: string;
  setTemperatureUnit: React.Dispatch<React.SetStateAction<string>>;
}

const UserPreference = ({
  selectedCity,
  setSelectedCity,
  temperatureUnit,
  setTemperatureUnit,
}: UserPreferenceProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader className="border-b border-gray-700 pb-6">
        <CardTitle className="text-3xl font-bold text-purple-300">
          Weather Monitoring System
        </CardTitle>
        <CardDescription className="text-gray-400">
          Real-time weather data for major Indian cities
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city-select" className="text-purple-300 mb-2 block">
              Select City
            </label>
            <Select onValueChange={setSelectedCity} defaultValue={selectedCity}>
              <SelectTrigger
                id="city-select"
                className="bg-gray-700 border-gray-600 text-gray-200"
              >
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="unit-select" className="text-purple-300 mb-2 block">
              Temperature Unit
            </label>
            <Select
              onValueChange={setTemperatureUnit}
              defaultValue={temperatureUnit}
            >
              <SelectTrigger
                id="unit-select"
                className="bg-gray-700 border-gray-600 text-gray-200"
              >
                <SelectValue placeholder="Select a unit" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {TEMPERATURE_UNITS.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <NotificationSettings temperatureUnit={temperatureUnit} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPreference;
