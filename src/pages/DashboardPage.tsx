import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { WeatherCard } from '../components/weather/WeatherCard';
import { CitySearch } from '../components/weather/CitySearch';
import { CityRankings } from '../components/weather/CityRankings';
import { Button } from '../components/ui/Button';
import { 
  getWeatherByCity, 
  getUserLocation, 
  getTopCities 
} from '../services/WeatherService';
import { WeatherData, City } from '../types/weather';
import toast from 'react-hot-toast';

export function DashboardPage() {
  const { user, loading } = useAuth();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [topTemperatureCities, setTopTemperatureCities] = useState<City[]>([]);
  const [topHumidityCities, setTopHumidityCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    document.title = 'Weather Dashboard - WeatherScope';
  }, []);

  useEffect(() => {
    async function loadInitialData() {
      if (user) {
        setIsLoading(true);
        try {
          const location = await getUserLocation();
          const weatherData = await getWeatherByCity(location.city);
          setWeatherData(weatherData);
          
          const { topTemperature, topHumidity } = await getTopCities();
          setTopTemperatureCities(topTemperature);
          setTopHumidityCities(topHumidity);
        } catch (error) {
          console.error('Error loading initial data:', error);
          toast.error('Failed to load weather data');
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadInitialData();
  }, [user]);

  const handleCitySearch = async (city: string) => {
    setIsLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      toast.success(`Weather loaded for ${data.location}`);
    } catch (error) {
      toast.error('Failed to load weather data for this city');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!weatherData) return;
    
    setIsRefreshing(true);
    try {
      
      const refreshedWeather = await getWeatherByCity(weatherData.location);
      setWeatherData(refreshedWeather);
      
     
      const { topTemperature, topHumidity } = await getTopCities();
      setTopTemperatureCities(topTemperature);
      setTopHumidityCities(topHumidity);
      
      toast.success('Weather data refreshed');
    } catch (error) {
      toast.error('Failed to refresh weather data');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Weather Dashboard</h1>
                <p className="text-gray-600">Check current weather conditions around the world</p>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw 
                  size={16} 
                  className={isRefreshing ? 'animate-spin' : ''} 
                />
                Refresh Data
              </Button>
            </div>
            
            <CitySearch onSearch={handleCitySearch} isLoading={isLoading} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Current Weather</h2>
            
            {isLoading && !weatherData ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-gray-200 h-24 w-24 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ) : weatherData ? (
              <WeatherCard data={weatherData} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">Search for a city to see the weather</p>
              </div>
            )}
          </motion.div>
          
     
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Global Weather Rankings</h2>
            <CityRankings 
              temperatureCities={topTemperatureCities} 
              humidityCities={topHumidityCities} 
            />
          </motion.div>
        </div>
      </main>
      
      <footer className="py-6 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl px-4 text-center text-gray-600 text-sm">
          <p>WeatherScope &copy; {new Date().getFullYear()} • Weather data powered by wttr.in</p>
        </div>
      </footer>
    </div>
  );
}