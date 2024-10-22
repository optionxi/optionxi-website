import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  BarChart2, 
  Search, 
  TrendingUp, 
  Trophy, 
  Brain, 
  Users, 
  Briefcase, 
  Bot, 
  Bell, 
  Filter, 
  GraduationCap, 
  LucideIcon
} from 'lucide-react';

// TypeScript interfaces
interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
  }
  
  interface FeatureCardProps {
    feature: Feature;
    index: number;
  }
  
const features = [
  { icon: BarChart2, title: 'Heatmap', description: 'Visualize market trends with our interactive heatmap.' },
  { icon: Search, title: 'Live Screeners', description: 'Real-time stock screening with customizable parameters.' },
  { icon: Activity, title: 'Live Scanners', description: 'Identify trading opportunities as they happen.' },
  { icon: TrendingUp, title: 'Virtual Trading', description: 'Practice strategies without risking real capital.' },
  { icon: Trophy, title: 'Leaderboard', description: 'Compete with traders worldwide and showcase your skills.' },
  { icon: Brain, title: 'Recommendations', description: 'Get AI-powered trade recommendations.' },
  { icon: Users, title: 'Trade Experts', description: 'Learn from and follow top-performing traders.' },
  { icon: Briefcase, title: 'Trade Portfolios', description: 'Manage and track multiple trading portfolios.' },
  { icon: Bot, title: 'Algo Trade Execution', description: 'Automate your trading strategies with ease.' },
  { icon: Bell, title: 'Price Alerts', description: 'Stay informed with customizable price notifications.' },
  { icon: Filter, title: 'Custom Screeners', description: 'Create and save your own stock screening criteria.' },
  { icon: GraduationCap, title: 'Courses', description: 'Enhance your trading skills with expert-led courses.' },
];

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
    return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      <div className="relative flex flex-col h-full bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-lg p-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg mb-6">
          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          {feature.title}
        </h3>
        <p className="text-gray-300 flex-grow">
          {feature.description}
        </p>
        <motion.div 
          className="absolute inset-0 rounded-lg border-2 border-transparent"
          animate={{
            borderColor: ['rgba(59, 130, 246, 0)', 'rgba(147, 51, 234, 0.3)', 'rgba(59, 130, 246, 0)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </motion.div>
  );
};

export default function FeatureSection() {
  return (
    <section className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Background gradient blobs */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Cutting-Edge Features
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empower your trading with our advanced tools and features
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}