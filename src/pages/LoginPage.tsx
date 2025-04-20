import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { CloudSun } from 'lucide-react';

export function LoginPage() {
  const { user, loading } = useAuth();
  
  // Change page title
  useEffect(() => {
    document.title = 'Login - WeatherScope';
  }, []);

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-white"></div>
          
          {/* Animated clouds */}
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              opacity: [0.7, 0.4, 0.7]
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity,
              repeatType: "mirror"
            }}
            className="absolute top-40 left-20 w-64 h-24 bg-white rounded-full opacity-50 blur-xl"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              repeatType: "mirror", 
              delay: 2 
            }}
            className="absolute bottom-40 right-20 w-72 h-28 bg-white rounded-full opacity-40 blur-xl"
          />
        </div>
        
        {/* Logo and form */}
        <div className="relative z-10 w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CloudSun size={56} className="text-blue-500 mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold text-center text-gray-900">WeatherScope</h1>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 text-center text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}