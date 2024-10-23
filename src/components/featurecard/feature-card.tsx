import { motion } from "framer-motion";

interface FeatureCardProps {
    icon: React.ReactNode; // You can adjust this if the icon has a specific type
    title: string;
    description: string;
  }
  
  
export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
      <motion.div
        className="relative p-1 rounded-lg overflow-hidden"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 0.5 }
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative bg-gray-900 p-6 rounded-lg z-10">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </motion.div>
    )
  }