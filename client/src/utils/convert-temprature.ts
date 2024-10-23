export const convertTemperature = (temp: number, unit: string): number => {
  switch (unit) {
    case "Fahrenheit":
      return (temp * 9) / 5 + 32;
    case "Kelvin":
      return temp + 273.15;
    default:
      return temp;
  }
};
