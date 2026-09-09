import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    let ctx = gsap.context(() => {
      // Setup initial states
      gsap.set('.vision-underline', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.vision-hero-desc', { opacity: 0, y: 20 });
      gsap.set('.vision-hero-logo', { opacity: 0 });
      gsap.set('.vision-circuit-lines path', { strokeDasharray: 1000, strokeDashoffset: 1000 });
      
      // HERO ANIMATION
      const tl = gsap.timeline();
      // 0.00s -> white background
      tl.to(containerRef.current, { backgroundColor: '#FFFFFF', duration: 0.1 });
      // 0.10s -> vertical decorative line draws
      tl.fromTo('.vision-vert-line', { height: 0 }, { height: '100%', duration: 0.5, ease: 'power3.out' }, 0.10);
      // 0.20s -> Character stagger reveal for OUR VISION
      tl.fromTo('.hero-char', 
                { yPercent: 120 }, 
                { yPercent: 0, duration: 1, stagger: 0.05, ease: 'power4.out' }, 0.20);
      // 0.50s -> underline draws (connected from the Home signal line conceptually)
      tl.to('.vision-underline', { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 0.50);
      // 0.65s -> description appears
      tl.to('.vision-hero-desc', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.65);
      // 0.75s -> logo gently appears
      tl.to('.vision-hero-logo', { opacity: 1, duration: 0.8, ease: 'power3.inOut' }, 0.75);
      // 0.90s -> circuit lines extend outward
      tl.to('.vision-circuit-lines path', { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: 'power2.out' }, 0.90);

      // BIG VISION STATEMENT
      gsap.fromTo('.bv-line', 
        { yPercent: 120 }, 
        { yPercent: 0, duration: 1, stagger: 0.15, ease: 'power4.out', scrollTrigger: { trigger: '.big-vision', start: 'top 75%' } }
      );
      gsap.fromTo('.big-vision-desc', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.big-vision-desc', start: 'top 85%' } }
      );

      // INTERACTIVE WORD SYSTEM
      const words = gsap.utils.toArray('.interactive-word');
      words.forEach((word: any, i: number) => {
        ScrollTrigger.create({
          trigger: word,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => gsap.to(word, { color: '#24B8A8', x: 20, duration: 0.4 }),
          onLeaveBack: () => gsap.to(word, { color: '#718096', x: 0, duration: 0.4 })
        });
        if (i < words.length - 1) {
           gsap.fromTo(`.word-conn-${i}`, 
             { scaleY: 0 }, 
             { scaleY: 1, transformOrigin: 'top', duration: 0.5, scrollTrigger: { trigger: word, start: 'top 50%' } }
           );
        }
      });

      // PILLAR 01 - DESIGN
      const p1 = gsap.timeline({ scrollTrigger: { trigger: '#pillar-01', start: 'top 70%' } });
      p1.fromTo('.p1-num', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo('.p1-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo('.p1-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo('.p1-svg-path', { strokeDasharray: 1000, strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, "-=0.2")
        .fromTo('.p1-block', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15 }, "-=1");

      // PILLAR 02 - LEARN
      const p2 = gsap.timeline({ scrollTrigger: { trigger: '#pillar-02', start: 'top 70%' } });
      p2.fromTo('.p2-num', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo('.p2-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo('.p2-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo('.p2-node', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1 }, "-=0.2")
        .fromTo('.p2-line', { strokeDasharray: 500, strokeDashoffset: 500 }, { strokeDashoffset: 0, duration: 1, stagger: 0.1 }, "-=0.6")
        .to('.p2-projects-node', { fill: '#1649C7', filter: 'drop-shadow(0 0 15px rgba(22, 73, 199, 0.4))', duration: 0.6 });

      // PILLAR 03 - CONNECT
      const p3 = gsap.timeline({ scrollTrigger: { trigger: '#pillar-03', start: 'top 70%' } });
      p3.fromTo('.p3-num', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo('.p3-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo('.p3-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

      // PILLAR 04 - CONVERT
      const p4 = gsap.timeline({ scrollTrigger: { trigger: '#pillar-04', start: 'top 70%' } });
      p4.fromTo('.p4-num', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo('.p4-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo('.p4-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo('.p4-prog-item', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.15 }, "-=0.2")
        .to('.p4-prog-final', { color: '#1649C7', scale: 1.05, transformOrigin: 'left', fontWeight: 700, duration: 0.5 })
        .fromTo('.p4-final-stmt', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, "+=0.2");

      // TIMELINE
      const tlScroll = gsap.timeline({ scrollTrigger: { trigger: '#vision-timeline', start: 'top 70%', end: 'bottom 80%', scrub: 1 } });
      tlScroll.fromTo('.v-timeline-line', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', ease: 'none' });
      
      gsap.utils.toArray('.v-time-node').forEach((node: any) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(node, { backgroundColor: '#24B8A8', scale: 1.2, duration: 0.3 });
            gsap.to(node.nextElementSibling, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
          }
        });
      });

      // FINAL
      const finalTl = gsap.timeline({ scrollTrigger: { trigger: '#vision-final', start: 'top 60%' } });
      finalTl.fromTo('.vf-line', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', duration: 1, ease: 'power2.inOut' })
             .fromTo('.vf-node', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 })
             .fromTo('.vf-heading', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, "-=0.2")
             .fromTo('.vf-sub', { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.4");
      
      gsap.to('.vf-node', {
         boxShadow: '0 0 20px 5px rgba(36, 184, 168, 0.4)',
         repeat: -1,
         yoyo: true,
         duration: 1.5,
         delay: 1.5
      });

      // CONTINUOUS SIGNAL THREAD
      gsap.to('.vision-thread-path', {
         strokeDashoffset: 0,
         ease: 'none',
         scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5
         }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="vision-page" style={{ backgroundColor: '#F7F9FC', color: '#071A4A', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Global Thread */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}>
        <path 
          className="vision-thread-path"
          d="M 120 0 L 120 400 L 40 480 L 40 1500 L 100 1560 L 100 4000" 
          fill="none" 
          stroke="rgba(36, 184, 168, 0.3)" 
          strokeWidth="1" 
          strokeDasharray="4000" 
          strokeDashoffset="4000" 
        />
      </svg>

      {/* Navbar transition wrapper */}
      <nav className="vision-navbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '1.5rem 4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
        <div style={{ position: 'absolute', left: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo_2.png" alt="MicroMinds" style={{ height: '48px', filter: 'invert(1)' }} />
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: '#071A4A' }}>
            DJS MICROMINDS<br/><span style={{ color: '#718096', fontWeight: 400 }}>VISION</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" className="nav-link" style={{ color: '#071A4A', fontWeight: 500, fontSize: '0.85rem' }}>Home</Link>
          <div className="nav-link nav-active" style={{ color: '#24B8A8', fontWeight: 600, fontSize: '0.85rem', position: 'relative' }}>Vision</div>
          <Link to="/team" className="nav-link" style={{ color: '#071A4A', fontWeight: 500, fontSize: '0.85rem' }}>Team</Link>
        </div>
      </nav>

      {/* 4. VISION HERO */}
      <section id="vision-hero" style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '4rem', paddingLeft: '4rem', paddingRight: '4rem', position: 'relative' }}>
        
        {/* Subtle background circuits */}
        <svg className="vision-circuit-lines" style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.15 }}>
          <path d="M 100 100 L 300 100 L 400 200 L 800 200" fill="none" stroke="#1649C7" strokeWidth="1" />
          <path d="M 200 300 L 400 300 L 500 400 L 800 400" fill="none" stroke="#24B8A8" strokeWidth="1" />
          <path d="M 300 500 L 600 500 L 700 600 L 800 600" fill="none" stroke="#071A4A" strokeWidth="1" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', display: 'flex' }}>
          {/* Left Vertical Line matches global thread */}
          <div style={{ width: '80px', position: 'relative' }}>
             <div className="vision-vert-line" style={{ width: '2px', background: '#24B8A8', position: 'absolute', left: '16px' }}></div>
          </div>
          
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 12rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', color: '#071A4A', margin: 0 }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
                <div className="vision-our" style={{ display: 'flex' }}>
                   {['O','U','R'].map((char, i) => <span key={`our-${i}`} className="hero-char" style={{ display: 'inline-block' }}>{char}</span>)}
                </div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
                <div className="vision-vision" style={{ color: '#1649C7', display: 'flex' }}>
                   {['V','I','S','I','O','N'].map((char, i) => <span key={`vis-${i}`} className="hero-char" style={{ display: 'inline-block' }}>{char}</span>)}
                </div>
              </div>
            </h1>
            
            <div className="vision-underline" style={{ height: '4px', width: 'clamp(200px, 40vw, 600px)', background: '#24B8A8', marginTop: '1rem', marginBottom: '3rem' }}></div>
            
            <div className="vision-hero-footer">
              <p className="vision-hero-desc" style={{ fontSize: '1.5rem', lineHeight: 1.6, color: '#071A4A', fontWeight: 500, maxWidth: '500px' }}>
                Building talent. Creating impact.<br/>
                <span style={{ color: '#718096' }}>Strengthening India's chip ecosystem.</span>
              </p>
              <div className="vision-hero-logo" style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0.1 }}>
                 <img src="/logo_2.png" alt="MicroMinds Logo" style={{ height: '200px', filter: 'invert(1)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BIG VISION STATEMENT */}
      <section className="big-vision" style={{ padding: '8rem 4rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="big-vision-heading" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#071A4A', marginBottom: '3rem' }}>
            <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}><span className="bv-line" style={{ display: 'block' }}>WE DON'T JUST TEACH VLSI.</span></div>
            <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}><span className="bv-line" style={{ display: 'block' }}>WE <span style={{ color: '#1649C7' }}>BUILD PEOPLE</span> WHO CAN BUILD IT.</span></div>
          </h2>
          <p className="big-vision-desc" style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#718096', maxWidth: '800px', margin: '0 auto' }}>
            MicroMinds exists to create an environment where students can learn deeply, build fearlessly, compete meaningfully and connect with the semiconductor ecosystem.
          </p>
        </div>
      </section>

      {/* 7. INTERACTIVE WORD SYSTEM & PILLARS */}
      <section style={{ padding: '8rem 4rem', position: 'relative' }}>
        <div className="vision-pillars-layout">
          
          {/* Sticky Word System */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: '20vh' }}>
              {['DESIGN', 'LEARN', 'CONNECT', 'CONVERT'].map((word, i) => (
                <div key={word} style={{ marginBottom: '3rem', position: 'relative' }}>
                  <div className="interactive-word" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#718096', letterSpacing: '0.1em' }}>
                    {word}
                  </div>
                  {i < 3 && (
                    <div className={`word-conn-${i}`} style={{ position: 'absolute', top: '100%', left: '12px', width: '1px', height: '3rem', background: 'rgba(36, 184, 168, 0.3)', marginTop: '0.5rem' }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pillars Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15rem' }}>
            
            {/* 8. PILLAR 01 - DESIGN */}
            <div id="pillar-01" className="vision-pillar-grid">
              <div>
                <span className="p1-num" style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: '#24B8A8', marginBottom: '1rem' }}>01</span>
                <h3 className="p1-heading" style={{ fontSize: '3rem', fontWeight: 800, color: '#071A4A', lineHeight: 1.1, marginBottom: '2rem' }}>
                  DESIGN<br/>
                  ONE CHIP.<br/>
                  END TO END.<br/>
                  <span style={{ color: '#1649C7' }}>SHIP SILICON.</span>
                </h3>
                <p className="p1-desc" style={{ fontSize: '1.1rem', color: '#718096', lineHeight: 1.6 }}>
                  MicroMinds aims to provide students with practical exposure to complete VLSI development and real-world chip design. From specification to physical layout, we build full-flow understanding.
                </p>
              </div>
              <div style={{ position: 'relative', height: '400px', background: '#FFFFFF', border: '1px solid #EAF1FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="80%" height="80%" viewBox="0 0 300 400" className="p1-svg">
                  {/* Flow connections */}
                  <path className="p1-svg-path" d="M 150 40 L 150 360" fill="none" stroke="#24B8A8" strokeWidth="2" />
                  <path className="p1-svg-path" d="M 150 120 L 220 120 L 220 200 L 150 200" fill="none" stroke="#EAF1FF" strokeWidth="2" />
                  <path className="p1-svg-path" d="M 150 200 L 80 200 L 80 280 L 150 280" fill="none" stroke="#EAF1FF" strokeWidth="2" />
                  
                  {/* Blocks */}
                  {['SPECIFICATION', 'ARCHITECTURE', 'DESIGN', 'VERIFICATION', 'IMPLEMENTATION'].map((text, i) => (
                    <g key={text} className="p1-block" transform={`translate(150, ${40 + i * 80})`}>
                      <rect x="-80" y="-20" width="160" height="40" fill="#F7F9FC" stroke="#1649C7" strokeWidth="1" />
                      <text x="0" y="5" textAnchor="middle" fill="#071A4A" fontSize="10" fontWeight="600" letterSpacing="0.05em">{text}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* 9. PILLAR 02 - LEARN */}
            <div id="pillar-02" className="vision-pillar-grid">
              <div style={{ order: 2 }}>
                <span className="p2-num" style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: '#24B8A8', marginBottom: '1rem' }}>02</span>
                <h3 className="p2-heading" style={{ fontSize: '3rem', fontWeight: 800, color: '#071A4A', lineHeight: 1.1, marginBottom: '2rem' }}>
                  LEARN.<br/>
                  COMPETE.<br/>
                  GROW.<br/>
                  <span style={{ color: '#1649C7' }}>VLSI FOR ALL.</span>
                </h3>
                <p className="p2-desc" style={{ fontSize: '1.1rem', color: '#718096', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Bridging VLSI fundamentals to advanced learning. We translate theory into practical implementation.
                </p>
                <ul className="p2-desc" style={{ listStyle: 'none', padding: 0, margin: 0, color: '#071A4A', fontWeight: 500 }}>
                  <li style={{ marginBottom: '0.5rem' }}>&rarr; Competitive Events</li>
                  <li style={{ marginBottom: '0.5rem' }}>&rarr; FPGA / Hardware Hackathons</li>
                  <li style={{ marginBottom: '0.5rem' }}>&rarr; Solving Real Problems</li>
                  <li>&rarr; Portfolio Building</li>
                </ul>
              </div>
              <div style={{ order: 1, position: 'relative', height: '400px', background: '#FFFFFF', border: '1px solid #EAF1FF' }}>
                 <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <path className="p2-line" d="M 200 80 L 120 180" fill="none" stroke="#24B8A8" strokeWidth="1.5" />
                    <path className="p2-line" d="M 200 80 L 280 180" fill="none" stroke="#24B8A8" strokeWidth="1.5" />
                    <path className="p2-line" d="M 120 180 L 120 280" fill="none" stroke="#24B8A8" strokeWidth="1.5" />
                    <path className="p2-line" d="M 280 180 L 280 280" fill="none" stroke="#24B8A8" strokeWidth="1.5" />
                    <path className="p2-line" d="M 120 280 L 200 360" fill="none" stroke="#24B8A8" strokeWidth="1.5" />
                    <path className="p2-line" d="M 280 280 L 200 360" fill="none" stroke="#24B8A8" strokeWidth="1.5" />
                    
                    <g className="p2-node" transform="translate(200, 80)">
                      <circle r="25" fill="#EAF1FF" stroke="#1649C7" />
                      <text x="0" y="4" textAnchor="middle" fill="#071A4A" fontSize="10" fontWeight="700">LEARN</text>
                    </g>
                    <g className="p2-node" transform="translate(120, 180)">
                      <circle r="25" fill="#FFFFFF" stroke="#24B8A8" />
                      <text x="0" y="4" textAnchor="middle" fill="#071A4A" fontSize="9" fontWeight="700">DIGITAL</text>
                    </g>
                    <g className="p2-node" transform="translate(280, 180)">
                      <circle r="25" fill="#FFFFFF" stroke="#24B8A8" />
                      <text x="0" y="4" textAnchor="middle" fill="#071A4A" fontSize="9" fontWeight="700">ANALOG</text>
                    </g>
                    <g className="p2-node" transform="translate(120, 280)">
                      <circle r="25" fill="#FFFFFF" stroke="#24B8A8" />
                      <text x="0" y="4" textAnchor="middle" fill="#071A4A" fontSize="9" fontWeight="700">FPGA</text>
                    </g>
                    <g className="p2-node" transform="translate(280, 280)">
                      <circle r="25" fill="#FFFFFF" stroke="#24B8A8" />
                      <text x="0" y="4" textAnchor="middle" fill="#071A4A" fontSize="9" fontWeight="700">ASIC</text>
                    </g>
                    <g className="p2-node p2-projects-node" transform="translate(200, 360)">
                      <circle r="30" fill="#EAF1FF" stroke="#1649C7" />
                      <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">PROJECTS</text>
                    </g>
                 </svg>
              </div>
            </div>

            {/* 10. PILLAR 03 - CONNECT */}
            <div id="pillar-03">
              <span className="p3-num" style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: '#24B8A8', marginBottom: '1rem' }}>03</span>
              <h3 className="p3-heading" style={{ fontSize: '3rem', fontWeight: 800, color: '#071A4A', lineHeight: 1.1, marginBottom: '2rem' }}>
                CONNECT<br/>
                <span style={{ color: '#1649C7' }}>THE INDUSTRY SITS IN.</span>
              </h3>
              <p className="p3-desc" style={{ fontSize: '1.1rem', color: '#718096', lineHeight: 1.6, maxWidth: '600px', marginBottom: '4rem' }}>
                Connecting students directly with the real world. Engineers, researchers, alumni, workshops, design reviews, and mentorship that bridges the campus-to-corporate gap.
              </p>
              


            </div>

            {/* 11. PILLAR 04 - CONVERT */}
            <div id="pillar-04" className="vision-pillar-grid">
              <div>
                <span className="p4-num" style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: '#24B8A8', marginBottom: '1rem' }}>04</span>
                <h3 className="p4-heading" style={{ fontSize: '3rem', fontWeight: 800, color: '#071A4A', lineHeight: 1.1, marginBottom: '2rem' }}>
                  CONVERT<br/>
                  OFFERS,<br/>
                  <span style={{ color: '#1649C7' }}>NOT CERTIFICATES.</span>
                </h3>
                <p className="p4-desc" style={{ fontSize: '1.1rem', color: '#718096', lineHeight: 1.6, marginBottom: '2rem' }}>
                  We focus on real outcomes. Skills, projects, internships, interviews, career preparation, and MS applications. We build portfolios that speak for themselves.
                </p>
                <p className="p4-final-stmt" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#071A4A' }}>
                  Our success = your opportunities.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px solid rgba(36, 184, 168, 0.2)', paddingLeft: '2rem' }}>
                {['LEARNING', 'SKILLS', 'PROJECTS', 'EXPERIENCE'].map((step) => (
                  <div key={step} className="p4-prog-item" style={{ fontSize: '1.25rem', fontWeight: 500, color: '#718096', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-2.45rem', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#24B8A8' }}></div>
                    {step}
                  </div>
                ))}
                <div className="p4-prog-item p4-prog-final" style={{ fontSize: '2rem', fontWeight: 500, color: '#071A4A', position: 'relative', marginTop: '1rem' }}>
                    <div style={{ position: 'absolute', left: '-2.6rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', borderRadius: '50%', background: '#1649C7' }}></div>
                    OPPORTUNITIES
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 12. FROM HERE TO THERE (TIMELINE) */}
      <section id="timeline" style={{ padding: '8rem 4rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #EAF1FF' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#071A4A', textAlign: 'center', marginBottom: '6rem' }}>
            FROM HERE <span style={{ color: '#24B8A8' }}>&rarr;</span> TO THERE
          </h2>
          
          <div id="vision-timeline" style={{ position: 'relative', paddingLeft: '50%' }}>
             {/* Central Line */}
             <div style={{ position: 'absolute', top: 0, left: '50%', width: '2px', height: '100%', background: 'rgba(7, 26, 74, 0.1)', transform: 'translateX(-50%)' }}></div>
             <div className="v-timeline-line" style={{ position: 'absolute', top: 0, left: '50%', width: '2px', height: '100%', background: '#24B8A8', transform: 'translateX(-50%)', transformOrigin: 'top' }}></div>
             
             {/* Timeline Entries */}
             {[
               { year: '2026', text: 'BUILD FOUNDATIONS', align: 'right' },
               { year: '', text: 'BUILD PROJECTS', align: 'left' },
               { year: '', text: 'BUILD COMMUNITY', align: 'right' },
               { year: '', text: 'BUILD INDUSTRY CONNECTIONS', align: 'left' },
               { year: 'FUTURE', text: 'LEAD THE ECOSYSTEM', align: 'right' },
             ].map((item, i) => (
               <div key={i} style={{ position: 'relative', height: '150px' }}>
                 <div className="v-time-node" style={{ position: 'absolute', top: '0', left: '0', width: '16px', height: '16px', background: '#FFFFFF', border: '2px solid #071A4A', borderRadius: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}></div>
                 <div style={{ 
                    position: 'absolute', top: '-12px', 
                    left: item.align === 'right' ? '2rem' : 'auto', 
                    right: item.align === 'left' ? '100%' : 'auto',
                    paddingRight: item.align === 'left' ? '2rem' : 0,
                    width: '300px',
                    textAlign: item.align === 'left' ? 'right' : 'left',
                    opacity: 0, transform: `translateX(${item.align === 'right' ? '-20px' : '20px'})`
                  }}>
                    {item.year && <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1649C7' }}>{item.year}</div>}
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#071A4A', marginTop: '0.25rem' }}>{item.text}</div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 13. FINAL VISION STATEMENT */}
      <section id="vision-final" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#071A4A', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        
        {/* Animated Line traveling down to the logo */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: '30%', width: '2px', background: 'rgba(255,255,255,0.1)' }}>
           <div className="vf-line" style={{ width: '100%', height: '100%', background: '#24B8A8', transformOrigin: 'top' }}></div>
        </div>
        
        <div className="vf-node" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', borderRadius: '50%', background: '#24B8A8' }}></div>

        <div style={{ textAlign: 'center', zIndex: 1, marginTop: '10%' }}>
          <h2 className="vf-heading" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
            THE FUTURE<br/>
            <span style={{ color: '#24B8A8' }}>IS BUILT.</span>
          </h2>
          <p className="vf-sub" style={{ fontSize: '1.5rem', color: '#EAF1FF', marginTop: '2rem', fontWeight: 500 }}>
            And we're building it together.
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: '4rem', opacity: 0.2 }}>
           <img src="/logo_2.png" alt="MicroMinds" style={{ height: '60px' }} />
        </div>
      </section>

    </div>
  );
}
