import { convertTemperature } from "./convert-temprature";

export const formatTemperature = (temp: number, unit: string): string => {
  const convertedTemp = convertTemperature(temp, unit);
  return `${convertedTemp.toFixed(1)}°${unit[0]}`;
};
