import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
}

interface BackgroundStar {
  left: string;
  top: string;
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
  const [hasMounted, setHasMounted] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'entrance'>('hidden');
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);
  const [centerRotation, setCenterRotation] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [nextStarId, setNextStarId] = useState(0);
  const [particlePhase, setParticlePhase] = useState(0);
  const [orbit1Radius, setOrbit1Radius] = useState(70);
  const [orbit2Radius, setOrbit2Radius] = useState(120);
  const [orbit3Radius, setOrbit3Radius] = useState(145); 

  // Background stars data (unchanged)
  const [backgroundStars] = useState<BackgroundStar[]>([
    { left: '32.261%', top: '16.3417%', scale: 1.28 },
    { left: '40.3565%', top: '16.4052%', scale: 0.975 },
    { left: '42.3174%', top: '41.6163%', scale: 0.24 },
    { left: '75.4031%', top: '34.2851%', scale: 0.014 },
    { left: '69.8158%', top: '28.3701%', scale: 1.059 },
    { left: '89.8175%', top: '41.1416%', scale: 0.469 },
    { left: '36.1935%', top: '80.6295%', scale: 1.374 },
    { left: '94.5527%', top: '48.5754%', scale: 1.115 },
    { left: '48.1173%', top: '42.1766%', scale: 0.606 },
    { left: '47.9446%', top: '13.5042%', scale: 0.05 },
    { left: '68.5835%', top: '91.5686%', scale: 0.32 },
    { left: '66.026%', top: '53.6815%', scale: 0.856 },
  ]);
  const [bgStarOffsets, setBgStarOffsets] = useState(backgroundStars.map(() => 0));

  // Brokers data (unchanged)
  const brokers: Broker[] = [
    { name: "Zerodha", logo: "assets/brokers/zerodha.png", users: "1.2M+" },
    { name: "Upstox", logo: "assets/brokers/upstox.png", users: "800K+" },
    { name: "Fyers", logo: "assets/brokers/fyers.png", users: "500K+" },
    { name: "Angel One", logo: "assets/brokers/angelone.png", users: "1M+" },
    { name: "ICICI Direct", logo: "assets/brokers/icicidirect.png", users: "600K+" },
    { name: "Groww", logo: "assets/brokers/groww.png", users: "400K+" },
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

  // Staggered entrance animation (unchanged)
  useEffect(() => {
    setHasMounted(true);
    const entranceTimer = setTimeout(() => setAnimationPhase('entrance'), 100);
    return () => {
      clearTimeout(entranceTimer);
    };
  }, []);

  // Update radii for responsive design (unchanged)
  useEffect(() => {
    const updateRadii = () => {
      if (typeof window !== "undefined") {
        const orbit1 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--orbit1-radius"));
        const orbit2 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--orbit2-radius"));
        const orbit3 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--orbit3-radius"));
        setOrbit1Radius(orbit1 || 70);
        setOrbit2Radius(orbit2 || 120);
        setOrbit3Radius(orbit3 || 145);
      }
    };
    updateRadii();
    window.addEventListener("resize", updateRadii);
    return () => window.removeEventListener("resize", updateRadii);
  }, []);

  // Main animation loop (unchanged)
  useEffect(() => {
    if (animationPhase === 'hidden') return;

    const interval = setInterval(() => {
      setRotation1((prev) => (prev + 0.3) % 360);
      setRotation2((prev) => (prev + 0.5) % 360);
      setRotation3((prev) => (prev - 0.25) % 360);
      setCenterRotation((prev) => (prev - 0.2) % 360);
      setParticlePhase((prev) => (prev + 1) % 360);
      setPulseScale(1 + Math.sin(Date.now() / 1000) * 0.025);
      setGlowIntensity(1 + Math.sin(Date.now() / 800) * 0.15);
      setBgStarOffsets(backgroundStars.map((_, i) => Math.sin(Date.now() / 1000 + i * 0.5) * 25));
    }, 30);
    return () => clearInterval(interval);
  }, [animationPhase, backgroundStars]);

  // Shooting stars generator (unchanged)
  useEffect(() => {
    if (animationPhase === 'hidden') return;

    const generateShootingStar = () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 150 + Math.random() * 150;
      const newStar: ShootingStar = {
        id: nextStarId, startX: 0, startY: 0,
        endX: Math.cos(angle) * distance,
        endY: Math.sin(angle) * distance,
        duration: 0.8 + Math.random() * 0.4,
        delay: 0,
      };
      setShootingStars(prev => [...prev, newStar]);
      setNextStarId(prev => prev + 1);
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, (newStar.duration + newStar.delay) * 1000);
    };
    const interval = setInterval(generateShootingStar, 300);
    return () => clearInterval(interval);
  }, [nextStarId, animationPhase]);

  // Render function (unchanged - glow rings are behind logos)
  const renderOrbitBroker = (orbitBroker: OrbitBroker, radius: number, rotationOffset: number) => {
    const { broker, angle } = orbitBroker;
    const totalAngle = angle + rotationOffset;
    const rad = (totalAngle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    return (
      <div
        key={broker.name + radius}
        className="absolute top-1/2 left-1/2"
        style={{
          transform: `translate(${x}px, ${y}px)`,
          marginLeft: "-20px", marginTop: "-20px",
          willChange: "transform",
        }}
      >
        {/* Pulsating glow rings (Behind the logo container) */}
        <div className="absolute inset-0 rounded-xl" style={{ width: '48px', height: '48px', marginLeft: '-4px', marginTop: '-4px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)', transform: `scale(${1 + Math.sin(particlePhase * 0.05 + angle * 0.01) * 0.3})`, filter: 'blur(8px)', willChange: "transform", pointerEvents: 'none' }} />
        <div className="absolute inset-0 rounded-xl" style={{ width: '48px', height: '48px', marginLeft: '-4px', marginTop: '-4px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)', transform: `scale(${1.5 + Math.sin(particlePhase * 0.05 + angle * 0.01 + Math.PI) * 0.4})`, filter: 'blur(12px)', willChange: "transform", pointerEvents: 'none' }} />

        {/* Broker Logo Container (On top) */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg bg-white" style={{ boxShadow: `0 0 ${15 * glowIntensity}px rgba(59, 130, 246, 0.3)` }}>
          <img src={broker.logo} alt={broker.name} className="w-7 h-7 sm:w-9 sm:h-9 object-contain" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = "none"; if (target.parentElement) { const fallback = document.createElement("div"); fallback.className = "text-xs font-bold text-gray-700"; fallback.textContent = broker.name.slice(0, 2).toUpperCase(); target.parentElement.appendChild(fallback); } }} />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full sm:min-h-screen flex items-center justify-center p-4 sm:p-8" style={{ contain: 'layout' }}>
      <div className="relative w-full max-w-[100vw] sm:max-w-2xl aspect-square flex items-center justify-center" style={{ contain: 'layout style' }}>

        {/* Background gradient (unchanged) */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 rounded-full" style={{ pointerEvents: 'none' }} />

        {/* Background stars (unchanged) */}
        {backgroundStars.map((star, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white/30 rounded-full" style={{ left: star.left, top: star.top, transform: `translateY(${bgStarOffsets[i]}px) scale(${star.scale})`, willChange: "transform", pointerEvents: 'none' }} />
        ))}

        <div className="relative w-full h-full flex items-center justify-center">
          {/* Inner orbit (keeps popIn animation) */}
          <div className="absolute top-1/2 left-1/2 border border-blue-500/30 rounded-full" style={{ width: `${orbit1Radius * 2}px`, height: `${orbit1Radius * 2}px`, marginLeft: `-${orbit1Radius}px`, marginTop: `-${orbit1Radius}px`, pointerEvents: 'none', opacity: animationPhase === 'hidden' ? 0 : 1, animation: animationPhase === 'entrance' ? 'popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards' : 'none' }}>
            {hasMounted && orbit1Brokers.map((orbitBroker) => renderOrbitBroker(orbitBroker, orbit1Radius, rotation1))}
          </div>

          {/* Middle orbit (keeps popIn animation) */}
          <div className="absolute top-1/2 left-1/2 border border-blue-500/20 rounded-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" style={{ width: `${orbit2Radius * 2}px`, height: `${orbit2Radius * 2}px`, marginLeft: `-${orbit2Radius}px`, marginTop: `-${orbit2Radius}px`, pointerEvents: 'none', opacity: animationPhase === 'hidden' ? 0 : 1, animation: animationPhase === 'entrance' ? 'popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards' : 'none' }}>
            {hasMounted && orbit2Brokers.map((orbitBroker) => renderOrbitBroker(orbitBroker, orbit2Radius, rotation2))}
          </div>

          {/* Outermost border ring (POP-IN ANIMATION REMOVED) */}
          <div className="absolute top-1/2 left-1/2 rounded-full border-[3px] border-blue-500/10 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" 
          style={{ 
            width: `${orbit3Radius * 2}px`, 
            height: `${orbit3Radius * 2}px`, 
            marginLeft: `-${orbit3Radius}px`, 
            marginTop: `-${orbit3Radius}px`, 
            pointerEvents: 'none', 
            // The element is now instantly visible when animationPhase becomes 'entrance'
            opacity: animationPhase === 'hidden' ? 0 : 1, 
            animation: 'none', // *** THIS IS THE KEY CHANGE ***
            transform: `rotate(${rotation3}deg)`,
            willChange: 'transform'
          }} />


          {/* Center Orb (unchanged) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

            {/* Pulsating Center Rings */}
            <div className="absolute top-1/2 left-1/2 rounded-full border-2 border-blue-500/30" style={{ width: "100px", height: "100px", willChange: "transform, opacity", transform: `translate(-50%, -50%) scale(${1 + Math.sin(particlePhase * 0.05) * 0.025})`, pointerEvents: 'none' }} />
            <div className="absolute top-1/2 left-1/2 rounded-full border-2 border-blue-500/30" style={{ width: "100px", height: "100px", willChange: "transform, opacity", transform: `translate(-50%, -50%) scale(${1.5 + Math.sin(particlePhase * 0.05 + Math.PI) * 0.26})`, pointerEvents: 'none' }} />

            {/* Shooting stars */}
            {hasMounted && animationPhase !== 'hidden' && shootingStars.map(star => (
              <div key={star.id} className="absolute top-1/2 left-1/2 w-2 h-2" style={{ '--end-transform': `translate(calc(-50% + ${star.endX}px), calc(-50% + ${star.endY}px)) scale(0)`, animation: `shoot ${star.duration}s ease-out forwards`, willChange: "transform, opacity", pointerEvents: 'none' } as React.CSSProperties}>
                <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg" style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)', filter: 'blur(0.5px)' }} />
              </div>
            ))}

            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center shadow-2xl overflow-hidden p-2" style={{ boxShadow: `0 0 ${40 * glowIntensity}px rgba(59, 130, 246, 0.6)`, transform: `rotate(${centerRotation}deg) scale(${pulseScale})`, willChange: "transform", opacity: animationPhase === 'hidden' ? 0 : 1, animation: animationPhase === 'entrance' ? 'popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none' }}>
              <div className="w-full h-full rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center p-1">
                <img src="/assets/images/logo_xi.png" alt="OptionXi" className="w-full h-full object-contain" style={{}} onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = "none"; if (target.parentElement) { const fallback = document.createElement("div"); fallback.className = "text-white font-bold text-xl"; fallback.textContent = "Xi"; target.parentElement.appendChild(fallback); } }} />
              </div>

              {[0, 90, 180, 270].map((angle, i) => (
                <div key={i} className="absolute" style={{ left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 50}px)`, top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 50}px)`, transform: `scale(${0.5 + Math.sin(particlePhase * 0.1 + i) * 0.5}) rotate(${particlePhase + angle}deg)`, willChange: "transform", pointerEvents: 'none' }}>
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 rounded-full blur-2xl" style={{ transform: `translateX(-50%) scale(${1 + Math.sin(particlePhase * 0.03) * 0.1})`, willChange: "transform", pointerEvents: 'none' }} />
      </div>

      <style>{`
        :root {
          --orbit1-radius: 70px;
          --orbit2-radius: 120px;
          --orbit3-radius: 145px;
        }
        @media (min-width: 640px) {
          :root {
            --orbit1-radius: 140px;
            --orbit2-radius: 220px;
            --orbit3-radius: 270px;
          }
        }
        @keyframes shoot {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: var(--end-transform); opacity: 0; }
        }
        @keyframes popIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default OrbitalSection;