import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { WeatherData } from '../../types/weather';
import { Cloud, CloudRain, Sun, Wind, Droplets, CloudLightning, Snowflake } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
  className?: string;
}

export function WeatherCard({ data, className = '' }: WeatherCardProps) {
  const getWeatherIcon = () => {
    const condition = data.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain size={56} className="text-blue-500" />;
    } else if (condition.includes('cloud')) {
      return <Cloud size={56} className="text-gray-500" />;
    } else if (condition.includes('sun') || condition.includes('clear')) {
      return <Sun size={56} className="text-amber-500" />;
    } else if (condition.includes('thunder') || condition.includes('lightning')) {
      return <CloudLightning size={56} className="text-purple-500" />;
    } else if (condition.includes('snow') || condition.includes('sleet')) {
      return <Snowflake size={56} className="text-blue-300" />;
    } else {
      return <Cloud size={56} className="text-gray-500" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'text-red-600';
    if (temp >= 25) return 'text-orange-500';
    if (temp >= 20) return 'text-amber-500';
    if (temp >= 15) return 'text-yellow-500';
    if (temp >= 10) return 'text-blue-400';
    return 'text-blue-600';
  };

  return (
    <Card variant="glass" className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{data.location}</CardTitle>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          {getWeatherIcon()}
        </motion.div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <motion.h2 
              className={`text-5xl font-bold ${getTemperatureColor(data.temperature)}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {data.temperature}°C
            </motion.h2>
            <div className="text-gray-700 text-xl">{data.condition}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center">
              <Wind size={24} className="text-gray-600 mb-2" />
              <span className="text-sm text-gray-500">Wind</span>
              <span className="font-semibold">{data.windSpeed} km/h</span>
            </div>
            <div className="flex flex-col items-center">
              <Droplets size={24} className="text-blue-500 mb-2" />
              <span className="text-sm text-gray-500">Humidity</span>
              <span className="font-semibold">{data.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <CloudRain size={24} className="text-blue-400 mb-2" />
              <span className="text-sm text-gray-500">Precip</span>
              <span className="font-semibold">{data.precipitation} mm</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}