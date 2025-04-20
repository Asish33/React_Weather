import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { CloudSun, CloudLightning, Droplets, Wind, MapPin, Users } from 'lucide-react';

export function LandingPage() {
  // Change page title
  useEffect(() => {
    document.title = 'WeatherScope - Live Weather Dashboard';
  }, []);

  const features = [
    {
      icon: <CloudSun size={24} className="text-blue-500" />,
      title: 'Real-time Weather',
      description: 'Get instant access to current weather conditions from anywhere in the world.',
    },
    {
      icon: <Droplets size={24} className="text-blue-500" />,
      title: 'Humidity Tracking',
      description: 'Monitor humidity levels to better plan your day and activities.',
    },
    {
      icon: <Wind size={24} className="text-blue-500" />,
      title: 'Wind Analysis',
      description: 'Check wind speed and direction for outdoor planning or weather awareness.',
    },
    {
      icon: <MapPin size={24} className="text-blue-500" />,
      title: 'Global Rankings',
      description: 'See temperature and humidity rankings from major cities worldwide.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white opacity-70"></div>
          
          {/* Animated clouds */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full opacity-50"
          />
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.4 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", delay: 2 }}
            className="absolute top-40 right-20 w-40 h-20 bg-white rounded-full opacity-50"
          />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Your Personal <span className="text-blue-600">Weather</span> Assistant
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Get real-time weather updates, track global temperature rankings, and plan your day with our comprehensive weather dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="px-8">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Log in
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-16 bg-blue-600"></div>
                  <div className="pt-12 p-6">
                    <div className="flex items-center mb-6">
                      <CloudSun size={64} className="text-blue-500 mr-4" />
                      <div>
                        <h3 className="text-2xl font-bold">San Francisco</h3>
                        <p className="text-gray-600">California, USA</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-6xl font-bold text-gray-900">22°C</div>
                      <div className="text-right">
                        <div className="text-xl text-gray-800">Partly Cloudy</div>
                        <div className="text-gray-600">Feels like 24°C</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <Wind className="inline-block text-blue-500 mb-1" />
                        <div className="text-sm text-gray-500">Wind</div>
                        <div className="font-semibold">12 km/h</div>
                      </div>
                      <div className="text-center">
                        <Droplets className="inline-block text-blue-500 mb-1" />
                        <div className="text-sm text-gray-500">Humidity</div>
                        <div className="font-semibold">65%</div>
                      </div>
                      <div className="text-center">
                        <CloudLightning className="inline-block text-blue-500 mb-1" />
                        <div className="text-sm text-gray-500">Precip</div>
                        <div className="font-semibold">0 mm</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-100 rounded-full z-[-1]"></div>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-200 rounded-full z-[-1]"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need in One Place
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive dashboard provides all the weather information you need for planning your day or week.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-2/3 mb-10 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to check the weather in style?
              </h2>
              <p className="text-xl text-blue-100">
                Join WeatherScope today and never get caught in the rain again.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50 border-2 border-white"
                >
                  <Users size={18} className="mr-2" />
                  Create Free Account
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <CloudSun size={32} className="text-blue-400 mr-2" />
              <span className="text-xl font-bold">WeatherScope</span>
            </div>
            
            <div className="flex gap-6">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} WeatherScope. All rights reserved.</p>
            <p className="mt-1">Powered by wttr.in for weather data</p>
          </div>
        </div>
      </footer>
    </div>
  );
}