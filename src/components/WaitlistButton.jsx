// src/components/WaitlistButton.jsx

import React from "react";



export default function WaitlistButton() {

  const handleClick = () => {

    // Pour l'instant simple anchor. Plus tard : ouvrir modal / scroll vers section / router.

    const el = document.getElementById("waitlist");

    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

  };



  return (

    <button

      onClick={handleClick}

      className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-xs tracking-[0.3em] uppercase text-white/90 hover:bg-white/10 hover:border-white/60 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.6)]"

    >

      Access waitlist

    </button>

  );

}



