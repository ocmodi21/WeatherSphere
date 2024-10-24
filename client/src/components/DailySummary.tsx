import { convertTemperature } from "@/utils/convert-temprature";
import { formatTemperature } from "@/utils/format-temprature";
import { WeatherIcon } from "@/utils/weather-icon";
import { LineChart } from "recharts";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { WeatherSummary } from "@/pages/Dashboard";
import { ChartContainer } from "./ui/chart";

interface DailySummaryProps {
  selectedCity: string;
  temperatureUnit: string;
  weatherSummaries: WeatherSummary[];
}

const DailySummary = ({
  selectedCity,
  temperatureUnit,
  weatherSummaries,
}: DailySummaryProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg overflow-x-auto">
      <CardHeader className="border-b border-gray-700 pb-6">
        <CardTitle className="text-2xl font-semibold text-purple-300">
          Daily Weather Summary for {selectedCity}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 px-2 sm:px-6">
        <ChartContainer
          config={{
            avgTemp: {
              label: "Average Temperature",
              color: "hsl(252, 100%, 80%)",
            },
            maxTemp: {
              label: "Maximum Temperature",
              color: "hsl(0, 100%, 80%)",
            },
            minTemp: {
              label: "Minimum Temperature",
              color: "hsl(180, 100%, 80%)",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weatherSummaries
                .filter((summary) => summary.city === selectedCity)
                .map((summary) => ({
                  date: new Date(summary.day).toLocaleDateString(),
                  avgTemp: convertTemperature(
                    summary.avg_temprature,
                    temperatureUnit
                  ),
                  maxTemp: convertTemperature(
                    summary.max_temprature,
                    temperatureUnit
                  ),
                  minTemp: convertTemperature(
                    summary.min_temprature,
                    temperatureUnit
                  ),
                }))}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.split("/")[1]}
              />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} width={30} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="avgTemp"
                stroke="hsl(252, 100%, 80%)"
                name="Avg"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="maxTemp"
                stroke="hsl(0, 100%, 80%)"
                name="Max"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="minTemp"
                stroke="hsl(180, 100%, 80%)"
                name="Min"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-6">
          <h4 className="font-semibold text-lg text-purple-300 mb-4">
            Dominant Weather Conditions:
          </h4>
          <ul className="space-y-3">
            {weatherSummaries
              .filter((summary) => summary.city === selectedCity)
              .map((summary) => (
                <li
                  key={summary.day}
                  className="flex items-center bg-gray-700 rounded-lg p-3"
                >
                  <WeatherIcon condition={summary.dominant} />
                  <span className="ml-4 text-gray-200">
                    {new Date(summary.day).toLocaleDateString()}:{" "}
                    {summary.dominant}, Avg:{" "}
                    {formatTemperature(summary.avg_temprature, temperatureUnit)}
                    , Max:{" "}
                    {formatTemperature(summary.max_temprature, temperatureUnit)}
                    , Min:{" "}
                    {formatTemperature(summary.min_temprature, temperatureUnit)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySummary;
