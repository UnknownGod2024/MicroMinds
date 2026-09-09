import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      // 1. Hero Animation
      gsap.fromTo('.proj-hero-word',
        { opacity: 0, y: 100, rotateZ: 5 },
        { opacity: 1, y: 0, rotateZ: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
      );
      gsap.fromTo('.proj-hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power2.out' }
      );

      // 1.5. Intro Description Animation
      gsap.fromTo('.proj-intro-element',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.proj-intro-section', start: 'top 80%' } }
      );

      // 2. SVG Signal Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.proj-svg-container',
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Sequence: RISC-V -> AI/DSP -> ADAPTIVE FABRIC -> PRECISION, PE ARRAY, DATAFLOW, TILING
      tl.to('.sig-path-main', { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut' })
        .to('.node-ai, .node-dsp', { stroke: '#24B8A8', fill: 'rgba(36, 184, 168, 0.1)', duration: 0.3 }, '-=0.2')
        .to('.sig-path-bottom', { strokeDashoffset: 0, duration: 0.8, ease: 'power1.inOut' })
        .to('.node-fabric', { stroke: '#24B8A8', fill: 'rgba(36, 184, 168, 0.1)', duration: 0.3 }, '-=0.2')
        .to('.sig-path-branches', { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut' }, '+=0.2')
        .to('.node-param', { stroke: '#24B8A8', fill: 'rgba(36, 184, 168, 0.1)', duration: 0.3, stagger: 0.1 }, '-=0.2');

      // 3. Work on List Animation
      gsap.fromTo('.work-row',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.work-section', start: 'top 75%' } }
      );

      // 4. Flow Animation
      gsap.fromTo('.flow-step',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.flow-section', start: 'top 85%' } }
      );

      // 5. Footer Animation
      gsap.fromTo('.proj-footer-text',
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.proj-footer-section', start: 'top 85%' } }
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: '#040D14', color: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* NAVIGATION */}


      {/* 1. PAGE HERO */}
      <section style={{ padding: '12rem 4rem 8rem 4rem', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Subtle background lines */}
        <svg style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', opacity: 0.2, pointerEvents: 'none' }}>
           <path className="bg-circuit-line" d="M -200 100 L 400 100 L 600 300 L 1400 300" fill="none" stroke="var(--color-teal)" strokeWidth="1" strokeDasharray="200" strokeDashoffset="200" />
           <path className="bg-circuit-line-2" d="M 1200 -200 L 1200 400 L 800 800 L -200 800" fill="none" stroke="var(--color-teal)" strokeWidth="1" strokeDasharray="200" strokeDashoffset="200" />
        </svg>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 900, fontFamily: 'var(--font-creative)', lineHeight: 0.9, margin: 0, marginBottom: '2rem', perspective: '1000px' }}>
            <div style={{ overflow: 'hidden' }}><div className="proj-hero-word" style={{ display: 'inline-block' }}>WHAT</div> <div className="proj-hero-word" style={{ display: 'inline-block' }}>WE'RE</div></div>
            <div style={{ overflow: 'hidden' }}><div className="proj-hero-word" style={{ display: 'inline-block', color: 'var(--color-teal)' }}>BUILDING.</div></div>
          </h1>
          <h3 className="proj-hero-sub" style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94A3B8', letterSpacing: '0.05em', margin: 0 }}>
            Ideas become experiments. Experiments become projects.
          </h3>
        </div>
      </section>

      {/* 2. NEUROADAPT-RISC */}
      <section className="proj-intro-section" style={{ padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="proj-intro-element" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, fontFamily: 'var(--font-creative)', margin: 0, marginBottom: '1rem' }}>NEUROADAPT-RISC</h2>
        <h4 className="proj-intro-element" style={{ fontSize: '1.25rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.05em', margin: 0, marginBottom: '3rem', maxWidth: '800px' }}>
          Workload-Adaptive RISC-V SoC for Energy-Efficient AI & DSP Acceleration
        </h4>
        <p className="proj-intro-element" style={{ fontSize: '1.5rem', lineHeight: 1.6, maxWidth: '900px', color: '#E2E8F0', fontWeight: 300, margin: 0 }}>
          The MicroMinds Core Team is currently working on NeuroAdapt-RISC, a workload-adaptive RISC-V SoC built around a configurable AI/DSP accelerator.
          <br/><br/>
          The accelerator is designed to adapt <strong>precision, PE-array configuration, dataflow, and tiling/buffering</strong> according to workload requirements.
        </p>
      </section>

      {/* 3 & 4. MAIN PROJECT VISUAL & ANIMATION */}
      <section className="proj-svg-container" style={{ padding: '4rem', display: 'flex', justifyContent: 'center', background: '#02060C', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <svg viewBox="0 0 1000 800" style={{ width: '100%', maxWidth: '1000px', height: 'auto', fontFamily: 'var(--font-main)' }}>
          {/* DEFINITIONS */}
          <defs>
             <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
             </filter>
          </defs>

          {/* BACKGROUND STRUCTURE (Faint) */}
          <g stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none">
             <path d="M 500 120 L 500 250" />
             <path d="M 500 200 L 250 200 L 250 250" />
             <path d="M 500 200 L 750 200 L 750 250" />
             <path d="M 250 350 L 250 400 L 500 400" />
             <path d="M 750 350 L 750 400 L 500 400" />
             <path d="M 500 400 L 500 500" />
             <path d="M 500 600 L 500 650 L 150 650 L 150 700" />
             <path d="M 500 600 L 500 650 L 380 650 L 380 700" />
             <path d="M 500 600 L 500 650 L 620 650 L 620 700" />
             <path d="M 500 600 L 500 650 L 850 650 L 850 700" />
          </g>

          {/* ANIMATED SIGNAL PATHS */}
          <g stroke="var(--color-teal)" strokeWidth="3" fill="none" filter="url(#glow)">
             <path className="sig-path-main" d="M 500 120 L 500 200 L 250 200 L 250 250 M 500 200 L 750 200 L 750 250" strokeDasharray="1000" strokeDashoffset="1000" />
             <path className="sig-path-bottom" d="M 250 350 L 250 400 L 500 400 L 500 500 M 750 350 L 750 400 L 500 400" strokeDasharray="1000" strokeDashoffset="1000" />
             <path className="sig-path-branches" d="M 500 600 L 500 650 L 150 650 L 150 700 M 500 650 L 380 650 L 380 700 M 500 650 L 620 650 L 620 700 M 500 650 L 850 650 L 850 700" strokeDasharray="2000" strokeDashoffset="2000" />
          </g>

          {/* NODES */}
          <rect x="350" y="40" width="300" height="80" rx="4" fill="#040D14" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <text x="500" y="85" fill="#FFF" fontSize="24" fontWeight="800" textAnchor="middle" letterSpacing="2">RISC-V</text>

          <rect className="node-ai" x="100" y="250" width="300" height="100" rx="4" fill="#040D14" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <text x="250" y="295" fill="#FFF" fontSize="22" fontWeight="700" textAnchor="middle">AI</text>
          <text x="250" y="325" fill="#94A3B8" fontSize="16" fontWeight="500" textAnchor="middle">GEMM / CNN</text>

          <rect className="node-dsp" x="600" y="250" width="300" height="100" rx="4" fill="#040D14" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <text x="750" y="295" fill="#FFF" fontSize="22" fontWeight="700" textAnchor="middle">DSP</text>
          <text x="750" y="325" fill="#94A3B8" fontSize="16" fontWeight="500" textAnchor="middle">FFT / FIR / MVDR</text>

          <rect className="node-fabric" x="300" y="500" width="400" height="100" rx="4" fill="#040D14" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <text x="500" y="555" fill="#FFF" fontSize="28" fontWeight="800" textAnchor="middle" letterSpacing="2">ADAPTIVE FABRIC</text>

          {/* BOTTOM PARAMS */}
          <rect className="node-param" x="50" y="700" width="200" height="80" rx="4" fill="#040D14" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <text x="150" y="735" fill="#FFF" fontSize="16" fontWeight="700" textAnchor="middle">PRECISION</text>
          <text x="150" y="760" fill="#94A3B8" fontSize="12" textAnchor="middle">INT4 / INT8 / INT16</text>

          <rect className="node-param" x="280" y="700" width="200" height="80" rx="4" fill="#040D14" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <text x="380" y="730" fill="#FFF" fontSize="16" fontWeight="700" textAnchor="middle">PE ARRAY</text>
          <text x="380" y="752" fill="#94A3B8" fontSize="11" textAnchor="middle">WORKLOAD-ADAPTIVE</text>
          <text x="380" y="768" fill="#94A3B8" fontSize="11" textAnchor="middle">CONFIGURATION</text>

          <rect className="node-param" x="520" y="700" width="200" height="80" rx="4" fill="#040D14" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <text x="620" y="735" fill="#FFF" fontSize="16" fontWeight="700" textAnchor="middle">DATAFLOW</text>
          <text x="620" y="760" fill="#94A3B8" fontSize="12" textAnchor="middle">RUNTIME ADAPTATION</text>

          <rect className="node-param" x="750" y="700" width="200" height="80" rx="4" fill="#040D14" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <text x="850" y="735" fill="#FFF" fontSize="16" fontWeight="700" textAnchor="middle">TILING</text>
          <text x="850" y="760" fill="#94A3B8" fontSize="12" textAnchor="middle">BUFFERING</text>
        </svg>
      </section>

      {/* 5. WHAT WE'RE WORKING ON */}
      <section className="work-section" style={{ padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, fontFamily: 'var(--font-creative)', margin: 0, marginBottom: '4rem' }}>WHAT WE'RE WORKING ON</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { num: '01', title: 'PRECISION', sub: 'INT4 / INT8 / INT16' },
            { num: '02', title: 'PE ARRAY', sub: 'WORKLOAD-ADAPTIVE CONFIGURATION' },
            { num: '03', title: 'DATAFLOW', sub: 'RUNTIME ADAPTATION' },
            { num: '04', title: 'TILING', sub: 'BUFFERING' }
          ].map((item, index) => (
            <div key={index} className="work-row" style={{ display: 'grid', gridTemplateColumns: '1fr 10fr', padding: '3rem 0', borderTop: '1px solid rgba(255,255,255,0.1)', alignItems: 'center' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--color-teal)', fontWeight: 700, fontFamily: 'var(--font-creative)' }}>{item.num}</div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-creative)', letterSpacing: '0.05em', color: '#F8FAFC', margin: 0 }}>{item.title}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 500, color: '#94A3B8', marginTop: '0.5rem', letterSpacing: '0.1em' }}>{item.sub}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>
        </div>
      </section>

      {/* 6 & 7. IMPLEMENTATION DIRECTION & STATUS */}
      <section className="flow-section" style={{ padding: '6rem 4rem', background: '#02060C', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-creative)', margin: 0, marginBottom: '4rem' }}>FROM RTL TOWARD SILICON.</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '6rem' }}>
            {['RTL', 'VERIFICATION', 'FPGA', 'PPA', 'PHYSICAL IMPLEMENTATION'].map((step, index, arr) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <span className="flow-step" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.1em', color: '#E2E8F0' }}>{step}</span>
                {index < arr.length - 1 && (
                  <span className="flow-step" style={{ color: 'var(--color-teal)', fontSize: '1.5rem' }}>&rarr;</span>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 2rem', border: '1px solid rgba(36, 184, 168, 0.3)', borderRadius: '4px', width: 'fit-content' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-teal)', boxShadow: '0 0 10px var(--color-teal)', animation: 'pulse-dot 2s infinite' }}></div>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.1em', color: '#F8FAFC' }}>CURRENTLY IN DEVELOPMENT</span>
          </div>
        </div>
      </section>

      {/* 9. FINAL SECTION */}
      <section className="proj-footer-section" style={{ padding: '8rem 4rem 4rem 4rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h2 className="proj-footer-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, fontFamily: 'var(--font-creative)', margin: 0, marginBottom: '2rem' }}>BUILDING WHAT COMES NEXT.</h2>
        <p className="proj-footer-text" style={{ fontSize: '1.5rem', color: '#94A3B8', fontWeight: 400, maxWidth: '600px', margin: 0, marginBottom: '6rem' }}>
          The MicroMinds Core Team is turning ideas into working hardware.
        </p>
        
        <button onClick={scrollToTop} style={{ background: 'none', border: 'none', color: 'var(--color-teal)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          BACK TO TOP &uarr;
        </button>
      </section>

      <style>{`
        @keyframes pulse-dot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(36, 184, 168, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(36, 184, 168, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(36, 184, 168, 0); }
        }
        @keyframes circuit-flow {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circuit-flow-reverse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 400; }
        }
        .bg-circuit-line {
          animation: circuit-flow 8s linear infinite;
        }
        .bg-circuit-line-2 {
          animation: circuit-flow-reverse 10s linear infinite;
        }
        @media (max-width: 768px) {
          .work-row { grid-template-columns: 1fr !important; gap: 1rem; }
        }
      `}</style>
    </div>
  );
};
