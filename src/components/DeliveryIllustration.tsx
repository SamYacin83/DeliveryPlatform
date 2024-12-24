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

        {/* Téléphone */}
        <motion.g
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <rect x="150" y="100" width="300" height="500" rx="20" fill="#1F2937" />
          <rect x="160" y="110" width="280" height="480" rx="15" fill="#F8FAFC" />
          
          {/* Carte dans le téléphone */}
          <rect x="170" y="120" width="260" height="400" rx="10" fill="#E5E7EB" />
          
          {/* Route sur la carte */}
          <motion.path
            d="M200,300 Q300,200 400,300"
            stroke="#EF4444"
            strokeWidth="4"
            strokeDasharray="8,8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Interface de distance */}
          <rect x="200" y="440" width="200" height="60" rx="10" fill="white" filter="url(#shadow)" />
          <text x="220" y="470" fill="#1F2937" className="text-sm font-medium">Distance</text>
          <text x="220" y="490" fill="#EF4444" className="text-lg font-bold">1,100 m</text>
        </motion.g>

        {/* Scooter et Livreur */}
        <motion.g
          initial={{ x: 800 }}
          animate={{ x: 500 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {/* Scooter */}
          <path
            d="M0,400 C30,390 60,390 80,400"
            stroke="#EF4444"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <circle cx="-10" cy="420" r="15" fill="#1F2937" /> {/* Roue arrière */}
          <circle cx="90" cy="420" r="15" fill="#1F2937" /> {/* Roue avant */}

          {/* Livreur */}
          <circle cx="40" cy="360" r="20" fill="#1F2937" /> {/* Tête avec casque */}
          <rect x="30" y="380" width="20" height="30" fill="#EF4444" rx="5" /> {/* Corps */}
          <rect x="20" y="370" width="40" height="10" fill="#EF4444" rx="5" /> {/* Épaules */}
          
          {/* Sac de livraison */}
          <rect x="-20" y="370" width="30" height="30" fill="#EF4444" rx="5" />
        </motion.g>

        {/* Éléments décoratifs */}
        <motion.path
          d="M600,100 C650,50 700,100 700,150"
          stroke="#E5E7EB"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Effets d'ombre */}
        <defs>
          <filter id="shadow" x="-4" y="0" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1"/>
          </filter>

          <linearGradient id="gradient" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
