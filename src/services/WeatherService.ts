import { WeatherData, City } from '../types/weather';

const MAJOR_CITIES: City[] = [
  { name: 'New York', country: 'US' },
  { name: 'London', country: 'UK' },
  { name: 'Paris', country: 'FR' },
  { name: 'Tokyo', country: 'JP' },
  { name: 'Sydney', country: 'AU' },
  { name: 'Rio de Janeiro', country: 'BR' },
  { name: 'Cairo', country: 'EG' },
  { name: 'Mumbai', country: 'IN' },
  { name: 'Beijing', country: 'CN' },
  { name: 'Moscow', country: 'RU' },
  { name: 'Dubai', country: 'AE' },
  { name: 'Singapore', country: 'SG' },
  { name: 'Los Angeles', country: 'US' },
  { name: 'Berlin', country: 'DE' },
  { name: 'Toronto', country: 'CA' },
];

function parseWttrResponse(data: any): WeatherData {
  const current = data.current_condition?.[0] || {};
  const location = data.nearest_area?.[0]?.areaName?.[0]?.value || 'Unknown';
  
  return {
    location,
    temperature: parseInt(current.temp_C || '0'),
    humidity: parseInt(current.humidity || '0'),
    windSpeed: parseInt(current.windspeedKmph || '0'),
    precipitation: parseFloat(current.precipMM || '0'),
    condition: current.weatherDesc?.[0]?.value || 'Unknown',
    icon: current.weatherIconUrl?.[0]?.value || '',
  };
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();
    return parseWttrResponse(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export async function getUserLocation(): Promise<{ city: string; country: string }> {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            resolve({
              city: data.city || 'London', 
              country: data.countryCode || 'UK',
            });
          } catch (error) {
            resolve({ city: 'London', country: 'UK' });
          }
        },
        () => {
          resolve({ city: 'London', country: 'UK' });
        }
      );
    } else {
      resolve({ city: 'London', country: 'UK' });
    }
  });
}

export async function getTopCities(): Promise<{
  topTemperature: City[];
  topHumidity: City[];
}> {
  try {
    const citiesWithWeather = await Promise.all(
      MAJOR_CITIES.map(async (city) => {
        try {
          const weatherData = await getWeatherByCity(city.name);
          return {
            ...city,
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
          };
        } catch (error) {
          return city;
        }
      })
    );

    const validCities = citiesWithWeather.filter(
      (city) => city.temperature !== undefined && city.humidity !== undefined
    );

    const topTemperature = [...validCities]
      .sort((a, b) => (b.temperature || 0) - (a.temperature || 0))
      .slice(0, 10);

    const topHumidity = [...validCities]
      .sort((a, b) => (b.humidity || 0) - (a.humidity || 0))
      .slice(0, 10);

    return { topTemperature, topHumidity };
  } catch (error) {
    console.error('Error fetching top cities:', error);
    return { topTemperature: [], topHumidity: [] };
  }
}