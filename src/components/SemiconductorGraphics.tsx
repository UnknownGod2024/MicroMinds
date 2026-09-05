import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function WaferHero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Initial drawing of routing paths
      tl.to('.route-path', {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.1
      });

      // Nodes popping in
      tl.fromTo('.node', 
        { scale: 0, opacity: 0, transformOrigin: 'center' },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05 },
        "-=1"
      );

      // Signal pulses travelling along paths
      gsap.to('.signal-pulse', {
        strokeDashoffset: -100, // moves the dash
        duration: 2,
        repeat: -1,
        ease: 'none',
        stagger: 0.5
      });
      
      // Slow rotation of outer wafer rings
      gsap.to('.wafer-ring', {
        rotation: 360,
        transformOrigin: 'center',
        duration: 60,
        repeat: -1,
        ease: 'none'
      });
      
      gsap.to('.wafer-ring-reverse', {
        rotation: -360,
        transformOrigin: 'center',
        duration: 80,
        repeat: -1,
        ease: 'none'
      });

    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 800 800" className="w-full h-auto" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
      {/* Outer Wafer Rings */}
      <circle className="wafer-ring" cx="400" cy="400" r="380" fill="none" stroke="#1E2633" strokeWidth="2" strokeDasharray="10 20" />
      <circle className="wafer-ring-reverse" cx="400" cy="400" r="360" fill="none" stroke="#1E2633" strokeWidth="1" strokeDasharray="50 10 5 10" />
      <circle cx="400" cy="400" r="390" fill="none" stroke="#0F172A" strokeWidth="20" /> {/* Base mask */}

      {/* Internal Grid / Floorplan Abstraction */}
      <g stroke="#1E2633" strokeWidth="1" opacity="0.5">
        {Array.from({length: 15}).map((_, i) => (
          <line key={`v-${i}`} x1={100 + i * 40} y1="100" x2={100 + i * 40} y2="700" />
        ))}
        {Array.from({length: 15}).map((_, i) => (
          <line key={`h-${i}`} x1="100" y1={100 + i * 40} x2="700" y2={100 + i * 40} />
        ))}
      </g>

      {/* Logic Gates / Macro Blocks */}
      <rect x="200" y="250" width="120" height="80" fill="#1E2633" stroke="#4DB8A6" strokeWidth="1" className="node" />
      <rect x="450" y="200" width="160" height="160" fill="none" stroke="#4DB8A6" strokeWidth="2" className="node" />
      <rect x="300" y="450" width="200" height="120" fill="#1E2633" className="node" />
      <circle cx="530" cy="280" r="30" fill="none" stroke="#4DB8A6" strokeWidth="2" className="node" />

      {/* Routing Paths */}
      <path className="route-path" d="M150,400 L250,400 L250,500 L300,500" fill="none" stroke="#4DB8A6" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" />
      <path className="route-path" d="M320,290 L400,290 L400,200 L450,200" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" />
      <path className="route-path" d="M500,500 L600,500 L600,600 L700,600" fill="none" stroke="#4DB8A6" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" />
      <path className="route-path" d="M610,280 L700,280 L700,400 L750,400" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000" />

      {/* Signal Pulses (Animated dashes over the paths) */}
      <path className="signal-pulse" d="M150,400 L250,400 L250,500 L300,500" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="20 1000" strokeDashoffset="0" style={{ opacity: 0.8 }} />
      <path className="signal-pulse" d="M500,500 L600,500 L600,600 L700,600" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="20 1000" strokeDashoffset="0" style={{ opacity: 0.8 }} />

      {/* Vias / Nodes */}
      <circle cx="250" cy="400" r="4" fill="#4DB8A6" className="node" />
      <circle cx="250" cy="500" r="4" fill="#4DB8A6" className="node" />
      <circle cx="400" cy="290" r="4" fill="#94A3B8" className="node" />
      <circle cx="400" cy="200" r="4" fill="#94A3B8" className="node" />
      <circle cx="600" cy="500" r="4" fill="#4DB8A6" className="node" />
      <circle cx="600" cy="600" r="4" fill="#4DB8A6" className="node" />
      <circle cx="700" cy="280" r="4" fill="#94A3B8" className="node" />
      <circle cx="700" cy="400" r="4" fill="#94A3B8" className="node" />

      {/* Micro annotations in SVG */}
      <text x="210" y="270" fill="#4DB8A6" fontSize="12" fontFamily="monospace" className="node">ALU_BLOCK</text>
      <text x="460" y="220" fill="#4DB8A6" fontSize="12" fontFamily="monospace" className="node">MEM_CTRL</text>
      <text x="310" y="470" fill="#94A3B8" fontSize="12" fontFamily="monospace" className="node">PLL_SYS</text>
    </svg>
  );
}

export function SignalWaveform({ active = false }: { active?: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !active) return;
    const ctx = gsap.context(() => {
      gsap.to('.wave-path', {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power1.inOut'
      });
    }, svgRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <svg ref={svgRef} viewBox="0 0 200 40" className="w-full h-auto">
      {/* Background grid */}
      <path d="M0,20 L200,20" stroke="#1E2633" strokeWidth="1" strokeDasharray="2 2" />
      {/* Clock Waveform */}
      <path className="wave-path" d="M0,30 L20,30 L20,10 L40,10 L40,30 L60,30 L60,10 L80,10 L80,30 L100,30 L100,10 L120,10 L120,30 L140,30 L140,10 L160,10 L160,30 L180,30 L180,10 L200,10" 
        fill="none" stroke="#4DB8A6" strokeWidth="2" strokeDasharray="500" strokeDashoffset="500" />
    </svg>
  );
}
