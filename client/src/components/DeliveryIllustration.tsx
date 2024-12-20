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
        
        {/* Route principale avec effet de perspective */}
        <motion.path
          d="M50,400 C200,380 600,420 750,400"
          stroke="#94A3B8"
          strokeWidth="100"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Ligne centrale de la route */}
        <motion.path
          d="M50,400 C200,380 600,420 750,400"
          stroke="#E2E8F0"
          strokeWidth="6"
          strokeDasharray="20,20"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Marqueur de départ avec animation */}
        <motion.g
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <circle cx="100" cy="400" r="30" fill="#22C55E" />
          <circle cx="100" cy="400" r="35" stroke="#22C55E" strokeWidth="2" strokeDasharray="6,3" />
          <path
            d="M100,385 L100,415 M85,400 L115,400"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <text x="70" y="450" fill="#1F2937" className="text-sm font-semibold">
            Point de départ
          </text>
        </motion.g>

        {/* Marqueur d'arrivée avec animation */}
        <motion.g
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <circle cx="700" cy="400" r="30" fill="#EF4444" />
          <circle cx="700" cy="400" r="35" stroke="#EF4444" strokeWidth="2" strokeDasharray="6,3" />
          <path
            d="M700,385 L700,415"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="700" cy="400" r="8" fill="white" />
          <text x="670" y="450" fill="#1F2937" className="text-sm font-semibold">
            Destination
          </text>
        </motion.g>

        {/* Livreur à moto avec animation */}
        <motion.g
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: 0,
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            x: { duration: 0.8, ease: "easeOut" },
            opacity: { duration: 0.3 },
            y: { 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }
          }}
        >
          {/* Moto */}
          <path
            d="M380,390 L450,390 C460,390 470,380 470,370 L470,360 C470,350 460,340 450,340 L420,340"
            stroke="#3B82F6"
            strokeWidth="8"
            fill="none"
          />
          <circle cx="380" cy="400" r="20" fill="#2563EB" /> {/* Roue arrière */}
          <circle cx="470" cy="400" r="20" fill="#2563EB" /> {/* Roue avant */}
          
          {/* Livreur */}
          <path
            d="M410,320 C420,310 440,310 450,320"
            stroke="#1D4ED8"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <circle cx="430" cy="290" r="25" fill="#3B82F6" /> {/* Tête avec casque */}
          <path
            d="M420,285 L440,285"
            stroke="#1D4ED8"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Sac de livraison */}
          <rect x="380" y="330" width="40" height="40" fill="#DC2626" rx="5" />
          <path
            d="M390,340 L410,340"
            stroke="white"
            strokeWidth="2"
          />
        </motion.g>

        {/* GPS Ping animé */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeOut",
          }}
        >
          <circle cx="430" cy="400" r="40" fill="#3B82F6" fillOpacity="0.2" />
          <circle cx="430" cy="400" r="20" fill="#3B82F6" fillOpacity="0.4" />
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
