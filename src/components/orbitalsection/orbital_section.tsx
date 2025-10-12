import React, { useState, useEffect } from "react";

interface Star {
  left: string;
  top: string;
  delay: number;
  scale: number;
}

interface Broker {
  name: string;
  logo: string;
  users: string;
}

interface OrbitBroker {
  broker: Broker;
  angle: number;
}

const OrbitalSection = () => {
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [centerRotation, setCenterRotation] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
  const [particleOffset, setParticleOffset] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [orbit1Radius, setOrbit1Radius] = useState(70);
  const [orbit2Radius, setOrbit2Radius] = useState(120);
  const [animationStage, setAnimationStage] = useState(0);

  // Initial animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 500);
    const timer2 = setTimeout(() => setAnimationStage(2), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const updateRadii = () => {
      if (typeof window !== "undefined") {
        const orbit1 = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--orbit1-radius");
        const orbit2 = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--orbit2-radius");
        setOrbit1Radius(parseFloat(orbit1 || "70"));
        setOrbit2Radius(parseFloat(orbit2 || "120"));
      }
    };
    updateRadii();
    window.addEventListener("resize", updateRadii);
    return () => window.removeEventListener("resize", updateRadii);
  }, []);

  useEffect(() => {
    if (animationStage < 2) return;

    const interval = setInterval(() => {
      setRotation1((prev) => (prev + 0.3) % 360);
      setRotation2((prev) => (prev + 0.5) % 360);
      setCenterRotation((prev) => (prev - 0.2) % 360);
      setParticleOffset((prev) => (prev + 0.5) % 360);
      setPulseScale(1 + Math.sin(Date.now() / 1000) * 0.02);
      setGlowIntensity(1 + Math.sin(Date.now() / 800) * 0.15);
    }, 30);

    return () => clearInterval(interval);
  }, [animationStage]);

  const brokers: Broker[] = [
    { name: "Zerodha", logo: "assets/brokers/zerodha.png", users: "1.2M+" },
    { name: "Upstox", logo: "assets/brokers/upstox.png", users: "800K+" },
    { name: "Fyers", logo: "assets/brokers/fyers.png", users: "500K+" },
    { name: "Angel One", logo: "assets/brokers/angelone.png", users: "1M+" },
    { name: "ICICI Direct", logo: "assets/brokers/icicidirect.png", users: "600K+" },
    { name: "Groww", logo: "assets/brokers/groww.png", users: "400K+" },
  ];

  const stars: Star[] = [
    { left: "96%", top: "60%", delay: 0, scale: 0.16 },
    { left: "55%", top: "18%", delay: 0.5, scale: 1.2 },
    { left: "51%", top: "7%", delay: 1, scale: 0.5 },
    { left: "35%", top: "98%", delay: 1.5, scale: 0.85 },
    { left: "58%", top: "51%", delay: 2, scale: 0.84 },
    { left: "11%", top: "59%", delay: 2.5, scale: 0.78 },
    { left: "61%", top: "68%", delay: 3, scale: 0.77 },
    { left: "1%", top: "33%", delay: 3.5, scale: 0.15 },
  ];

  const orbit1Brokers: OrbitBroker[] = [
    { broker: brokers[0], angle: 0 },
    { broker: brokers[1], angle: 120 },
    { broker: brokers[2], angle: 240 },
  ];

  const orbit2Brokers: OrbitBroker[] = [
    { broker: brokers[3], angle: 60 },
    { broker: brokers[4], angle: 180 },
    { broker: brokers[5], angle: 300 },
  ];

  const getStageTransform = (distance: number) => {
    if (animationStage === 0) {
      return { opacity: 0, scale: 0, distance: 0 };
    } else if (animationStage === 1) {
      return { opacity: 1, scale: 1, distance: 0 };
    } else {
      return { opacity: 1, scale: 1, distance };
    }
  };

  const renderOrbitBroker = (orbitBroker: OrbitBroker, radius: number, rotationOffset: number) => {
    const { broker, angle } = orbitBroker;
    const stageProps = getStageTransform(radius);
    const totalAngle = angle + rotationOffset;
    const rad = (totalAngle * Math.PI) / 180;
    const x = Math.cos(rad) * stageProps.distance;
    const y = Math.sin(rad) * stageProps.distance;

    return (
      <div
        key={angle}
        className="absolute top-1/2 left-1/2 transition-all duration-700 ease-out"
        style={{
          transform: `translate(${x}px, ${y}px) scale(${stageProps.scale})`,
          marginLeft: "-20px",
          marginTop: "-20px",
          opacity: stageProps.opacity,
        }}
      >
        <div
          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg bg-white"
          style={{
            boxShadow: `0 0 ${15 * glowIntensity}px rgba(59, 130, 246, 0.3)`,
          }}
        >
          <img
            src={broker.logo}
            alt={broker.name}
            className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              if (target.parentElement) {
                const fallback = document.createElement("div");
                fallback.className = "text-xs font-bold text-gray-700";
                fallback.textContent = broker.name.slice(0, 2).toUpperCase();
                target.parentElement.appendChild(fallback);
              }
            }}
          />
        </div>
      </div>
    );
  };

  const orbitStageProps = getStageTransform(1);

  return (
    <div className="w-full sm:min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-[100vw] sm:max-w-2xl aspect-square flex items-center justify-center overflow-visible">

        {/* Stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              transform: `translateY(${Math.sin(particleOffset + star.delay) * 20}px) scale(${star.scale})`,
              animationDelay: `${star.delay}s`,
              opacity: animationStage >= 1 ? 1 : 0,
              transition: "opacity 0.5s ease-out",
            }}
          />
        ))}

        {/* Orbit rings */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Inner orbit */}
          <div
            className="absolute top-1/2 left-1/2 border border-blue-500/30 rounded-full transition-all duration-700 ease-out"
            style={{
              width: animationStage >= 2 ? `${orbit1Radius * 2}px` : "0px",
              height: animationStage >= 2 ? `${orbit1Radius * 2}px` : "0px",
              marginLeft: animationStage >= 2 ? `-${orbit1Radius}px` : "0px",
              marginTop: animationStage >= 2 ? `-${orbit1Radius}px` : "0px",
              opacity: orbitStageProps.opacity,
            }}
          >
            {orbit1Brokers.map((orbitBroker) =>
              renderOrbitBroker(orbitBroker, orbit1Radius, rotation1)
            )}
          </div>

          {/* Outer orbit */}
          <div
            className="absolute top-1/2 left-1/2 border border-blue-500/20 rounded-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 transition-all duration-700 ease-out"
            style={{
              width: animationStage >= 2 ? `${orbit2Radius * 2}px` : "0px",
              height: animationStage >= 2 ? `${orbit2Radius * 2}px` : "0px",
              marginLeft: animationStage >= 2 ? `-${orbit2Radius}px` : "0px",
              marginTop: animationStage >= 2 ? `-${orbit2Radius}px` : "0px",
              opacity: orbitStageProps.opacity,
            }}
          >
            {orbit2Brokers.map((orbitBroker) =>
              renderOrbitBroker(orbitBroker, orbit2Radius, rotation2)
            )}
          </div>

          {/* Center Orb */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
            style={{
              opacity: animationStage >= 1 ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${animationStage >= 1 ? 1 : 0})`,
            }}
          >
            {/* Pulse rings */}
            {animationStage >= 2 && (
              <>
                <div
                  className="absolute rounded-full border-2 border-blue-500/30 animate-ping"
                  style={{
                    width: "clamp(60px, 15vw, 80px)",
                    height: "clamp(60px, 15vw, 80px)",
                    animationDuration: "2s",
                  }}
                ></div>
                <div
                  className="absolute rounded-full border-2 border-blue-500/30 animate-ping"
                  style={{
                    width: "clamp(60px, 15vw, 80px)",
                    height: "clamp(60px, 15vw, 80px)",
                    animationDuration: "2s",
                    animationDelay: "0.5s",
                  }}
                ></div>
              </>
            )}

            {/* OptionXi orb */}
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center shadow-2xl overflow-hidden p-2"
              style={{
                boxShadow: `0 0 ${40 * glowIntensity}px rgba(59, 130, 246, 0.6)`,
                transform: `rotate(${centerRotation}deg) scale(${pulseScale})`,
              }}
            >
              <div className="w-full h-full rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center p-1">
                <img
                  src="/assets/images/logo_xi.png"
                  alt="OptionXi"
                  className="w-full h-full object-contain"
                  style={{ transform: `rotate(${-centerRotation}deg)` }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      const fallback = document.createElement("div");
                      fallback.className = "text-white font-bold text-xl";
                      fallback.textContent = "Xi";
                      target.parentElement.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --orbit1-radius: 70px;
          --orbit2-radius: 120px;
        }
        @media (min-width: 640px) {
          :root {
            --orbit1-radius: 140px;
            --orbit2-radius: 220px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrbitalSection;