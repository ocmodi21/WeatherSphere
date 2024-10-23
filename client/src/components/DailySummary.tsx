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
import { DailySummaryData } from "@/pages/Dashboard";

interface DailySummaryProps {
  temperatureUnit: string;
  dailySummaries: DailySummaryData[];
}

const DailySummary = ({
  temperatureUnit,
  dailySummaries,
}: DailySummaryProps) => {
  const formattedSummaries = dailySummaries.map((summary) => ({
    ...summary,
    avgTemp: convertTemperature(summary.avgTemp, temperatureUnit),
    maxTemp: convertTemperature(summary.maxTemp, temperatureUnit),
    minTemp: convertTemperature(summary.minTemp, temperatureUnit),
  }));

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader className="border-b border-gray-700 pb-6">
        <CardTitle className="text-2xl font-semibold text-purple-300">
          Daily Weather Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedSummaries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgTemp"
                stroke="hsl(252, 100%, 80%)"
                name="Average Temp"
              />
              <Line
                type="monotone"
                dataKey="maxTemp"
                stroke="hsl(0, 100%, 80%)"
                name="Max Temp"
              />
              <Line
                type="monotone"
                dataKey="minTemp"
                stroke="hsl(180, 100%, 80%)"
                name="Min Temp"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold text-lg text-purple-300 mb-4">
            Dominant Weather Conditions:
          </h4>
          <ul className="space-y-3">
            {dailySummaries.map((summary) => (
              <li
                key={summary.date}
                className="flex items-center bg-gray-700 rounded-lg p-3"
              >
                <WeatherIcon condition={summary.dominantCondition} />
                <span className="ml-4 text-gray-200">
                  {summary.date}: {summary.dominantCondition}, Avg:{" "}
                  {formatTemperature(summary.avgTemp, temperatureUnit)}, Max:{" "}
                  {formatTemperature(summary.maxTemp, temperatureUnit)}, Min:{" "}
                  {formatTemperature(summary.minTemp, temperatureUnit)}
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
