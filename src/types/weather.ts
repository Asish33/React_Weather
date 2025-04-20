export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  condition: string;
  icon: string;
}

export interface City {
  name: string;
  country: string;
  temperature?: number;
  humidity?: number;
}