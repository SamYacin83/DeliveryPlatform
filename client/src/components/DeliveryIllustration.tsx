import { motion } from "framer-motion";

export default function DeliveryIllustration() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Fond avec dégradé */}
        <rect width="800" height="600" fill="url(#gradient)" />
        
        {/* Route */}
        <path
          d="M100,300 Q400,100 700,300"
          stroke="#CBD5E1"
          strokeWidth="8"
          strokeDasharray="8,8"
          strokeLinecap="round"
        />
        
        {/* Point de départ */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <circle cx="100" cy="300" r="20" fill="#22C55E" />
          <text x="85" y="340" fill="#1F2937" className="text-sm font-medium">Départ</text>
        </motion.g>
        
        {/* Point d'arrivée */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <circle cx="700" cy="300" r="20" fill="#EF4444" />
          <text x="680" y="340" fill="#1F2937" className="text-sm font-medium">Arrivée</text>
        </motion.g>
        
        {/* Livreur */}
        <motion.g
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <circle cx="400" cy="220" r="40" fill="#3B82F6" /> {/* Tête */}
          <rect x="380" y="260" width="40" height="60" fill="#3B82F6" rx="20" /> {/* Corps */}
          <rect x="360" y="280" width="80" height="20" fill="#2563EB" rx="10" /> {/* Bras */}
          <rect x="380" y="320" width="15" height="40" fill="#1D4ED8" /> {/* Jambe gauche */}
          <rect x="405" y="320" width="15" height="40" fill="#1D4ED8" /> {/* Jambe droite */}
          
          {/* Colis */}
          <rect x="350" y="270" width="30" height="30" fill="#92400E" rx="5" />
        </motion.g>
        
        {/* Pins de localisation animés */}
        <motion.g
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
            delay: 0.8
          }}
        >
          <circle cx="400" cy="180" r="8" fill="#EF4444" />
          <path
            d="M400,180 L400,160 L410,170 Z"
            fill="#EF4444"
          />
        </motion.g>
        
        {/* Dégradé de fond */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
