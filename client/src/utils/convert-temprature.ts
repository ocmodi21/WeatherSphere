export const convertTemperature = (temp: number, unit: string): number => {
  switch (unit) {
    case "Fahrenheit":
      return ((temp - 273.15) * 9) / 5 + 32;
    case "Celsius":
      return temp - 273.15;
    default:
      return temp;
  }
};
