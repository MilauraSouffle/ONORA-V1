import React, { useState } from "react";
import StaticNoise from "../components/StaticNoise";

export default function Home() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <div className="relative w-full h-full dashboard-content">
      {!bootDone && <StaticNoise onFinish={() => setBootDone(true)} />}

      {bootDone && (
        <div className="w-full h-full min-h-full">
          {/* Le contenu du dashboard sera injecté ici plus tard */}
        </div>
      )}
    </div>
  );
}