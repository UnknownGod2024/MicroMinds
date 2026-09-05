import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function ExplodedChip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Gentle floating animation for the layers
      gsap.to('.chip-layer', {
        y: '-=10',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: {
          each: 0.1,
          from: 'start'
        }
      });
      
      // Pulse the central beam
      gsap.to('.central-beam', {
        opacity: 0.8,
        scaleY: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="exploded-chip-container" ref={containerRef}>
      
      {/* CSS Isometric 3D Space */}
      <div className="iso-scene">
        
        {/* Central glowing beam */}
        <div className="central-beam"></div>

        {/* LAYER 5: Base Substrate */}
        <div className="chip-layer layer-substrate" style={{ transform: 'translateZ(0px)' }}>
          <div className="substrate-base"></div>
          {/* Pins around edges */}
          <div className="substrate-pins top"></div>
          <div className="substrate-pins bottom"></div>
          <div className="substrate-pins left"></div>
          <div className="substrate-pins right"></div>
        </div>

        {/* LAYER 4: Interconnect / Traces */}
        <div className="chip-layer layer-interconnect" style={{ transform: 'translateZ(50px)' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="none" stroke="rgba(77, 184, 166, 0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid-pattern)" />
            {/* Some thick glowing traces */}
            <path d="M 20 20 L 80 20 L 80 80 L 20 80 Z" fill="none" stroke="var(--color-teal)" strokeWidth="1" />
            <path d="M 10 50 L 90 50 M 50 10 L 50 90" stroke="var(--color-teal)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* LAYER 3: Silicon Die (Small blocks/grid) */}
        <div className="chip-layer layer-die" style={{ transform: 'translateZ(100px)' }}>
          <div className="die-grid">
            {Array.from({length: 36}).map((_, i) => (
              <div key={i} className="die-block" style={{
                background: Math.random() > 0.8 ? 'rgba(77,184,166,0.6)' : Math.random() > 0.6 ? 'rgba(217, 119, 6, 0.4)' : 'rgba(15,23,42,0.8)'
              }}></div>
            ))}
          </div>
        </div>

        {/* LAYER 2: Cooling / Perforated Plate */}
        <div className="chip-layer layer-plate" style={{ transform: 'translateZ(160px)' }}>
          <div className="perforated-plate"></div>
        </div>

        {/* LAYER 1: Heat Spreader (Lid) */}
        <div className="chip-layer layer-lid" style={{ transform: 'translateZ(220px)' }}>
          <div className="lid-surface">
            {/* Glowing MicroMinds Logo */}
            <svg viewBox="0 0 100 100" className="logo-glow">
              <circle cx="50" cy="50" r="25" fill="none" stroke="var(--color-teal)" strokeWidth="2" />
              <text x="50" y="55" textAnchor="middle" fill="var(--color-teal)" fontSize="20" fontFamily="monospace" fontWeight="bold">μ</text>
            </svg>
          </div>
        </div>

      </div>

      {/* HTML HUD Annotations (Rendered flat on top of the 3D scene, connected by visual lines) */}
      
      <div className="chip-annotation" style={{ top: '-10%', right: '-30%' }}>
        <div className="flex flex-col">
          <span className="text-teal text-bold">HEAT SPREADER</span>
          <span className="text-muted">DISSIPATE. SUSTAIN.</span>
        </div>
        <div className="chip-line" style={{ width: '150px', transform: 'translate(-100px, 30px) rotate(-15deg)' }}></div>
      </div>

      <div className="chip-annotation" style={{ top: '20%', right: '-30%' }}>
        <div className="flex flex-col">
          <span className="text-teal text-bold">SILICON DIE</span>
          <span className="text-muted">IDEAS. LOGIC. IMPACT.</span>
        </div>
        <div className="chip-line" style={{ width: '120px', transform: 'translate(-80px, 30px) rotate(-10deg)' }}></div>
      </div>

      <div className="chip-annotation" style={{ top: '50%', right: '-30%' }}>
        <div className="flex flex-col">
          <span className="text-teal text-bold">INTERCONNECT</span>
          <span className="text-muted">BRIDGE POSSIBILITIES.</span>
        </div>
        <div className="chip-line" style={{ width: '150px', transform: 'translate(-100px, -10px) rotate(15deg)' }}></div>
      </div>

      <div className="chip-annotation" style={{ top: '80%', right: '-30%' }}>
        <div className="flex flex-col">
          <span className="text-teal text-bold">SUBSTRATE</span>
          <span className="text-muted">ENABLE. SUPPORT.</span>
        </div>
        <div className="chip-line" style={{ width: '180px', transform: 'translate(-140px, -20px) rotate(25deg)' }}></div>
      </div>

    </div>
  );
}
