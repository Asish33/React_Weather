import React from 'react';
import { Link } from 'react-router-dom';
import { CloudOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CloudOff size={80} className="text-blue-400 mb-6" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center"
      >
        404 - Page Not Found
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xl text-gray-600 mb-8 text-center max-w-md"
      >
        Looks like you've wandered into cloudy territory. The page you're looking for doesn't exist.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link to="/">
          <Button size="lg">
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}