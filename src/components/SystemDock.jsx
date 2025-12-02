// src/components/SystemDock.jsx

// Dock style macOS / VisionOS avec physique des icônes

// Navigation vers les studios et les outils IA



import React, { useRef } from "react";

import { Link } from "react-router-dom";

import { 

  motion, 

  useMotionValue, 

  useSpring, 

  useTransform, 

} from "framer-motion";

import { 

  Radar, 

  Bot, 

} from "lucide-react";



// --- CONFIGURATION DES APPS DU DOCK ---

const DOCK_ITEMS = [

  // STUDIOS

  {

    id: "skriib",

    name: "SKRiiB",

    iconType: "image",

    src: "/logos/logo-skriib.png", 

    path: "/studios/skriib",

    color: "bg-cyan-500/20"

  },

  {

    id: "cliip",

    name: "CLiiP",

    iconType: "image",

    src: "/logos/logo-cliip.png",

    path: "/studios/cliip",

    color: "bg-orange-500/20"

  },

  {

    id: "siion",

    name: "SiioN",

    iconType: "image",

    src: "/logos/logo-siion.png",

    path: "/studios/siion",

    color: "bg-emerald-500/20"

  },

  {

    id: "hackiing",

    name: "HACKiinG",

    iconType: "image",

    src: "/logos/logo-hackiing.png",

    path: "/studios/hackiing",

    color: "bg-purple-500/20"

  },

  // SEPARATOR

  { id: "separator", type: "separator" },

  // TOOLS

  {

    id: "ai-assistant",

    name: "ONORA IA",

    iconType: "component",

    component: Bot,

    path: "/login", 

    color: "bg-blue-600",

    glow: "shadow-[0_0_20px_rgba(37,99,235,0.6)]"

  },

  {

    id: "audit",

    name: "Audit Scan",

    iconType: "component",

    component: Radar,

    path: "/scan",

    color: "bg-red-500",

    glow: "shadow-[0_0_20px_rgba(239,68,68,0.6)]"

  }

];



// --- COMPOSANT ICONE INDIVIDUEL ---

function DockIcon({ mouseX, item }) {

  const ref = useRef(null);



  // Mathématiques pour l'effet de vague (Magnification)

  const distance = useTransform(mouseX, (val) => {

    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;

  });



  // Largeur de base 50px, grossit jusqu'à 100px quand la souris est proche

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 100, 50]);

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });



  return (

    <Link to={item.path} className="relative group">

      <motion.div

        ref={ref}

        style={{ width }}

        className={`

          aspect-square rounded-2xl 

          flex items-center justify-center 

          backdrop-blur-md border border-white/20

          transition-colors duration-200

          overflow-hidden

          ${item.iconType === 'component' ? item.color : 'bg-white/10'}

          ${item.glow || ''}

        `}

      >

        {/* Rendu conditionnel : Image ou Icône Lucide */}

        {item.iconType === "image" ? (

          <img 

            src={item.src} 

            alt={item.name}

            className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-200" 

          />

        ) : (

          <item.component className="w-1/2 h-1/2 text-white" />

        )}

      </motion.div>



      {/* Tooltip (Nom de l'app au survol) */}

      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-sm">

        {item.name}

      </div>

    </Link>

  );

}



// --- COMPOSANT PRINCIPAL ---

export default function SystemDock() {

  const mouseX = useMotionValue(Infinity);



  return (

    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">

      <motion.div

        onMouseMove={(e) => mouseX.set(e.pageX)}

        onMouseLeave={() => mouseX.set(Infinity)}

        initial={{ y: 100, opacity: 0 }}

        animate={{ y: 0, opacity: 1 }}

        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}

        className="

          pointer-events-auto

          flex items-end gap-3 

          px-4 pb-3 pt-3

          mx-4

          rounded-[2rem]

          bg-white/10 backdrop-blur-2xl

          border border-white/20

          shadow-[0_20px_40px_rgba(0,0,0,0.4)]

        "

      >

        {DOCK_ITEMS.map((item, index) => (

          <React.Fragment key={index}>

            {item.type === "separator" ? (

              <div className="w-[1px] h-10 bg-white/20 mx-1 self-center" />

            ) : (

              <DockIcon mouseX={mouseX} item={item} />

            )}

          </React.Fragment>

        ))}

      </motion.div>

    </div>

  );

}


