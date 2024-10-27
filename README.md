# WeatherSphere

## Objective
The objective of this project is to develop a real-time data processing system to monitor and analyze weather conditions across major metro cities in India. By continuously retrieving data from the OpenWeatherMap API, the system provides timely insights through summarized daily weather metrics and generates alerts when weather conditions exceed predefined thresholds. The system processes weather data in real time, allowing users to observe temperature trends, dominant weather conditions, and historical records. The system’s flexible structure supports user-configurable alert thresholds and includes visualizations for easy monitoring.

The core goals of this project are:
- To continuously gather and process weather data from OpenWeatherMap for Indian metro cities.
- To generate daily rollups and aggregates, enabling users to access detailed weather summaries.
- To support configurable alert thresholds, notifying users when specific weather conditions or temperatures are met.
- To provide visualizations, giving users an intuitive view of daily summaries, historical data, and triggered alerts.

## Features

- **Real-Time Weather Data Collection**
  - Continuously retrieve weather data from OpenWeatherMap API at configurable intervals (e.g., every 5 minutes).
  - Fetch data specifically for major metro cities in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
  - Convert temperature values from Kelvin to Celsius for easy readability, with support for user-defined temperature units.

- **Daily Weather Summaries**
  - **Daily Rollups**: Compile daily summaries for each city, storing values such as:
    - **Average Temperature**: Calculated from multiple records throughout the day.
    - **Maximum Temperature**: The highest temperature recorded during the day.
    - **Minimum Temperature**: The lowest temperature recorded during the day.
    - **Dominant Weather Condition**: The weather condition (e.g., Rain, Clear) that occurred most frequently, helping users understand the typical weather pattern for the day.
  - Store all daily summaries in a database, allowing access to historical weather insights and enabling further analysis.

- **User-Configurable Alerting Thresholds**
  - Define custom alert thresholds for specific temperature values or weather conditions (e.g., alert if the temperature exceeds 35°C for two consecutive updates).
  - Continuously compare real-time data with thresholds to detect condition breaches.
  - Trigger alerts if thresholds are breached, with options for console display or notifications through an email or push notification system (implementation customizable).

- **Visualizations and Historical Data**
  - Display visualizations for daily weather summaries, highlighting trends in temperature and weather conditions over time.
  - Provide a historical view of past weather trends for each city, allowing users to observe patterns and analyze weather behavior.
  - Triggered alerts are also visualized, showing alert history, reasons, and alert types (e.g., temperature spikes, unusual weather).
