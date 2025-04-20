import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { City } from '../../types/weather';
import { Thermometer, Droplets } from 'lucide-react';

interface CityRankingsProps {
  temperatureCities: City[];
  humidityCities: City[];
}

export function CityRankings({ temperatureCities, humidityCities }: CityRankingsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Thermometer size={24} className="text-red-500 mr-2" />
            Top 10 Hottest Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            {temperatureCities.map((city, index) => (
              <motion.li
                key={city.name}
                variants={item}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <span>
                    {city.name}, {city.country}
                  </span>
                </div>
                <span className="font-semibold text-red-600">{city.temperature}°C</span>
              </motion.li>
            ))}
            {temperatureCities.length === 0 && (
              <li className="text-gray-500 text-center py-8">Loading cities...</li>
            )}
          </motion.ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Droplets size={24} className="text-blue-500 mr-2" />
            Top 10 Most Humid Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            {humidityCities.map((city, index) => (
              <motion.li
                key={city.name}
                variants={item}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <span>
                    {city.name}, {city.country}
                  </span>
                </div>
                <span className="font-semibold text-blue-600">{city.humidity}%</span>
              </motion.li>
            ))}
            {humidityCities.length === 0 && (
              <li className="text-gray-500 text-center py-8">Loading cities...</li>
            )}
          </motion.ul>
        </CardContent>
      </Card>
    </div>
  );
}