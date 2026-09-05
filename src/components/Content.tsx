import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SignalWaveform } from './SemiconductorGraphics';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Instagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Linkedin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Content() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const chipRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [bursts, setBursts] = useState<{id: number, x: number, y: number}[]>([]);

  const handleChipClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newBurst = { id: Date.now(), x, y };
    setBursts(prev => [...prev, newBurst]);
    
    // Auto remove after animation
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== newBurst.id));
    }, 2000);
  };

  const connectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        // Continuous Floating Chip Animation
        gsap.to(chipRef.current, {
          y: '+=15',
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      }
      
      // EXACT TIMELINE COORDINATION (TOTAL <= 1.6s)
      const tl = gsap.timeline({
        onComplete: () => {
          document.querySelectorAll('.text-mask-wrapper').forEach(el => {
            (el as HTMLElement).style.overflow = 'visible';
          });
        }
      });
      // 0.00s — dark background visible (handled by CSS)
      // 0.15s — circuit paths draw
      tl.fromTo('#bg-path-1', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power3.out' }, 0.15);
      tl.fromTo('#bg-path-2', { strokeDashoffset: 1500 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power3.out' }, 0.15);
      // 0.30s — 3D chip reveals
      tl.fromTo(chipRef.current, { opacity: 0, scale: 0.9, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out' }, 0.30);
      // 0.60s — DJS MICROMINDS reveals (navbar)
      tl.fromTo('.navbar', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.60);
      // 0.75s — IDEAS reveals
      tl.from('.mask-ideas', { y: '100%', duration: 1, ease: 'power4.out' }, 0.75);
      // 0.90s — INTO reveals
      tl.from('.mask-into', { y: '100%', duration: 1, ease: 'power4.out' }, 0.90);
      // 1.05s — SILICON. reveals
      tl.from('.mask-silicon', { y: '100%', duration: 1, ease: 'power4.out' }, 1.05);
      // 1.20s — description reveals
      tl.to('.hero-desc-typewriter', {
        text: "A student-driven VLSI community<br/>building ideas, exploring technology<br/>and creating a stronger tomorrow.",
        duration: 2,
        ease: 'none'
      }, 1.20);
      // 1.35s — buttons reveal
      tl.fromTo('.magnetic-wrap', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, 1.35);

      // Ambient Chip Sweep (every 8 seconds)
      gsap.fromTo('.chip-sweep', 
        { x: '-100%' }, 
        { x: '200%', duration: 1.5, ease: 'power2.inOut', repeat: -1, repeatDelay: 8 }
      );


      // Navbar Scroll Effect
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          const nav = document.getElementById('navbar');
          if (!nav) return;
          if (self.direction === 1) {
            nav.classList.add('scrolled');
          } else if (self.progress === 0) {
            nav.classList.remove('scrolled');
          }
          
          // Background Color Detection for Navbar text color
          const scrollY = window.scrollY;
          const introTop = document.getElementById('intro')?.offsetTop || 0;
          const visionTop = document.getElementById('vision')?.offsetTop || 0;
          const projectsTop = document.getElementById('projects')?.offsetTop || 0;
          const eventsTop = document.getElementById('events')?.offsetTop || 0;
          const teamTop = document.getElementById('team')?.offsetTop || 0;
          const facultyTop = document.getElementById('faculty')?.offsetTop || 0;
          const connectTop = document.getElementById('connect')?.offsetTop || 0;
          
          const isLight = (scrollY >= introTop && scrollY < visionTop) || 
                          (scrollY >= projectsTop && scrollY < eventsTop) ||
                          (scrollY >= teamTop && scrollY < facultyTop) ||
                          (scrollY >= facultyTop && scrollY < connectTop);

          if (isLight) {
            nav.classList.add('light-mode');
            nav.style.color = '#0F172A';
          } else {
            nav.classList.remove('light-mode');
            nav.style.color = '#F8FAFC';
          }
        }
      });

      // Subtle Parallax for Large Graphics
      gsap.utils.toArray<HTMLElement>('.parallax-graphic').forEach(el => {
        gsap.to(el, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Connect Section Tapeout
      if (connectRef.current) {
        gsap.to('.tapeout-path', {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: connectRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: true
          }
        });
        
        gsap.fromTo('.tapeout-text',
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: connectRef.current,
              start: 'center 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Global Continuous Signal Line
      gsap.to('.global-signal-path', {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });

      // Scroll Reveals for Sections (Coordinated Groups)
      const sections = gsap.utils.toArray('section:not(#hero)');
      sections.forEach((sec: any) => {
        const title = sec.querySelector('.section-title');
        const content = sec.querySelectorAll('.grid-col, .project-card, .event-photo');
        
        const stl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });
        
        if (title) {
          stl.fromTo(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        }
        if (content.length) {
          stl.fromTo(content, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, "-=0.4");
        }
      });

      // Navbar Active Indicator (GSAP ScrollTrigger for each section)
      const navLinks = document.querySelectorAll('.nav-link');
      sections.forEach((sec: any, i: number) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive && navLinks[i+1]) { // +1 because hero is first
              navLinks.forEach(link => link.classList.remove('nav-active'));
              navLinks[i+1].classList.add('nav-active');
            }
          }
        });
      });
      // Handle Hero separately
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            navLinks.forEach(link => link.classList.remove('nav-active'));
            navLinks[0].classList.add('nav-active');
          }
        }
      });

      // Magnetic Buttons
      if (!prefersReducedMotion) {
        const buttons = document.querySelectorAll('.magnetic-btn');
        buttons.forEach((btn) => {
          btn.addEventListener('mousemove', (e: any) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out', scale: 1.02 });
          });
          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)', scale: 1 });
          });
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Parallax values
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;
    
    // Background (2px)
    gsap.to(bgRef.current, { x: -xPos * 4, y: -yPos * 4, duration: 1, ease: 'power2.out' });
    
    // 3D Chip (10px)
    gsap.to(chipRef.current, { 
      x: -xPos * 20, 
      y: -yPos * 20, 
      rotationY: xPos * 4, 
      rotationX: -yPos * 4,
      duration: 1.5, 
      ease: 'power2.out' 
    });
    
    // Foreground Text (14px)
    if (heroTextRef.current) {
      gsap.to(heroTextRef.current, {
        x: -xPos * 28,
        y: -yPos * 28,
        rotationY: xPos * 8,
        rotationX: -yPos * 8,
        duration: 1,
        ease: 'power2.out'
      });
    }
  };

  const handleHeroMouseLeave = () => {
    gsap.to([bgRef.current, chipRef.current, heroTextRef.current], {
      x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 1.5, ease: 'power3.out'
    });
  };

  return (
    <div ref={containerRef}>
      
      {/* GLOBAL CONTINUOUS SIGNAL */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }}>
        <path 
          className="global-signal-path"
          d="M 50 0 L 50 150 L 20 180 L 20 800 L 90 870 L 90 2000" 
          fill="none" 
          stroke="var(--color-teal)" 
          strokeWidth="3" 
          strokeDasharray="2000" 
          strokeDashoffset="2000" 
          style={{ filter: 'drop-shadow(0 0 10px var(--color-teal))' }}
        />
      </svg>

      <nav className="navbar" id="navbar">
        <div className="logo title-font" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo_2.png" alt="MicroMinds Logo" style={{ height: '64px' }} />
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', lineHeight: 1.2 }}>DJS MICROMINDS<br/><span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>VLSI CLUB</span></div>
        </div>
        <div className="nav-links">
          <a href="#hero" className="nav-link nav-active">Home</a>
          <a href="#vision" className="nav-link">Vision</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#events" className="nav-link">Events</a>
          <a href="#team" className="nav-link">Team</a>
          <a href="#faculty" className="nav-link">Faculty</a>
          <a href="#connect" className="nav-link">Connect</a>
        </div>
        <div>
          <a href="#connect" className="btn magnetic-btn">JOIN THE CLUB &rarr;</a>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="hero-wrapper" 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{ minHeight: '100vh', display: 'flex', flexWrap: 'wrap', alignItems: 'center', paddingTop: '6rem', paddingBottom: '8rem', backgroundColor: '#040D14' }}
      >
        
        {/* Background circuit lines (abstract SVG) */}
        <div ref={bgRef} style={{ position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%', pointerEvents: 'none', zIndex: 0, opacity: 0.5 }}>
           <svg width="100%" height="100%">
              {/* Path matching reference */}
              <path id="bg-path-1" d="M 0 200 L 200 200 L 400 400 L 800 400" fill="none" stroke="rgba(77, 184, 166, 0.3)" strokeWidth="2" />
              {/* Glowing signal particle traversing the path */}
              <path d="M 0 200 L 200 200 L 400 400 L 800 400" fill="none" stroke="var(--color-teal)" strokeWidth="4" strokeDasharray="50 1000" style={{ animation: 'electric-zap 8s infinite linear', filter: 'drop-shadow(0 0 10px var(--color-teal))' }} />

              <path id="bg-path-2" d="M 1200 0 L 1200 200 L 900 500 L 900 1000" fill="none" stroke="rgba(77, 184, 166, 0.3)" strokeWidth="2" />
              <path d="M 1200 0 L 1200 200 L 900 500 L 900 1000" fill="none" stroke="var(--color-teal)" strokeWidth="4" strokeDasharray="30 1500" style={{ animation: 'electric-zap 12s infinite linear 2s', filter: 'drop-shadow(0 0 10px var(--color-teal))' }} />
              
              {/* Interactive Nodes */}
              <circle cx="200" cy="200" r="3" fill="var(--color-teal)" className="circuit-node" />
              <circle cx="400" cy="400" r="3" fill="var(--color-teal)" className="circuit-node" />
              <circle cx="900" cy="500" r="4" fill="var(--color-teal)" className="circuit-node" />
           </svg>
        </div>

        {/* Content Area */}
        <div className="hero-content-area w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: '4rem', gridTemplateColumns: '4fr 8fr' }}>
          
          {/* Left Typography */}
          <div className="flex flex-col justify-center relative">
            
            <h1 className="text-hero" ref={heroTextRef} style={{ display: 'inline-block', perspective: 1000, lineHeight: 0.85, margin: 0, marginTop: '4rem' }}>
              <span className="text-mask-wrapper"><span className="text-mask-content mask-ideas">IDEAS</span></span>
              <span className="text-mask-wrapper"><span className="text-mask-content mask-into">INTO</span></span>
              <span className="text-mask-wrapper"><span className="text-mask-content text-teal mask-silicon">SILICON.</span></span>
            </h1>
            
            {/* Starts empty, GSAP TextPlugin types it out */}
            <p className="hero-desc hero-desc-typewriter" style={{ marginTop: '2rem', minHeight: '4.5rem' }}></p>
            
            <div className="flex mt-4" style={{ gap: '1rem' }}>
              <div className="magnetic-wrap"><a href="#projects" className="btn btn-primary hero-text-anim magnetic-btn">EXPLORE PROJECTS &rarr;</a></div>
              <div className="magnetic-wrap"><a href="#team" className="btn hero-text-anim magnetic-btn">MEET THE TEAM</a></div>
            </div>

          </div>
          
          {/* Right Graphic Area (The Exploded Chip) */}
          <div className="relative flex items-center justify-center w-full" style={{ perspective: '1000px' }}>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '900px', transform: 'translateY(-2rem)' }}>
              <img 
                ref={chipRef}
                src="/microminds_exploded_chip.svg" 
                alt="Exploded VLSI Chip" 
                className="cursor-pointer" 
                onClick={handleChipClick}
                style={{ 
                  width: '100%', 
                  position: 'relative',
                  zIndex: 10,
                  WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
                  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)'
                }} 
              />
              <div className="chip-sweep" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(77,184,166,0.15), transparent)',
                transform: 'skewX(-20deg)',
                zIndex: 11,
                pointerEvents: 'none'
              }}></div>
            </div>

            {/* Electrical Bursts */}
            {bursts.map(burst => (
              <svg key={burst.id} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20 }}>
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2 + (Math.random() * 0.5);
                  const length = 200 + Math.random() * 400;
                  const x2 = burst.x + Math.cos(angle) * length;
                  const y2 = burst.y + Math.sin(angle) * length;
                  // create jagged lightning path
                  let path = `M ${burst.x} ${burst.y}`;
                  let curX = burst.x;
                  let curY = burst.y;
                  for (let j = 0; j < 5; j++) {
                    curX += (x2 - burst.x) / 5 + (Math.random() - 0.5) * 60;
                    curY += (y2 - burst.y) / 5 + (Math.random() - 0.5) * 60;
                    path += ` L ${curX} ${curY}`;
                  }
                  
                  return (
                    <path
                      key={i}
                      d={path}
                      fill="none"
                      stroke="var(--color-teal)"
                      strokeWidth={Math.random() * 4 + 2}
                      style={{
                        filter: 'drop-shadow(0 0 12px var(--color-teal))',
                        animation: `electric-zap 0.6s ease-out forwards ${Math.random() * 0.2}s`
                      }}
                    />
                  );
                })}
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section id="intro" className="bg-light relative">
        <div className="grid">
          <div className="col-span-5">
            <span className="text-label" style={{ color: 'var(--color-navy)' }}>01 &mdash; MICROMINDS</span>
            <h2 className="text-heading" style={{ color: 'var(--color-navy)' }}>
              MORE THAN<br/>A CLUB.
            </h2>
            <p className="text-body text-muted mt-8">
              DJS MicroMinds is a student-driven VLSI community focused on learning, designing, researching and building with silicon. We bridge the gap between theoretical electronics and practical chip design.
            </p>
          </div>
          
          <div className="col-span-6 col-start-7 flex flex-col justify-center">
            <div className="grid" style={{ padding: 0, gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }}>
              <div>
                <span className="text-label" style={{ color: 'var(--color-navy)' }}>01</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-navy)' }}>VLSI DESIGN</h3>
              </div>
              <div>
                <span className="text-label" style={{ color: 'var(--color-navy)' }}>02</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-navy)' }}>RESEARCH<br/>&amp; LEARNING</h3>
              </div>
              <div>
                <span className="text-label" style={{ color: 'var(--color-navy)' }}>03</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-navy)' }}>PROJECTS<br/>&amp; BUILDING</h3>
              </div>
              <div>
                <span className="text-label" style={{ color: 'var(--color-navy)' }}>04</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-navy)' }}>COMMUNITY<br/>&amp; COLLABORATION</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION */}
      <section id="vision" className="bg-dark">
        <div className="grid">
          <div className="col-span-6">
            <span className="text-label">02 &mdash; OUR VISION</span>
            <h2 className="text-heading">
              BUILDING THE NEXT<br/>GENERATION OF<br/>SEMICONDUCTOR<br/>INNOVATORS.
            </h2>
            <p className="text-body text-muted mt-8">
              We aim to foster semiconductor awareness and provide practical, project-based experience. By collaborating and building a strong VLSI community, we expose students to industry-relevant technology that transforms them from students into silicon builders.
            </p>
          </div>
          <div className="col-span-6 flex items-center justify-center relative">
            <div className="parallax-graphic" style={{ border: '1px solid rgba(77, 184, 166, 0.2)', padding: '4rem', width: '100%', height: '500px', position: 'relative' }}>
              <div className="micro-annotation" style={{ position: 'absolute', top: '-0.75rem', left: '2rem', background: 'var(--color-navy)' }}>LAYOUT_VIEW</div>
              
              {/* Abstract layout geometry */}
              <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                <div style={{ background: '#1E2633', gridColumn: 'span 2', gridRow: 'span 2' }}></div>
                <div style={{ background: '#1E2633' }}></div>
                <div style={{ background: '#1E2633' }}></div>
                <div style={{ background: '#1E2633', gridColumn: 'span 2' }}></div>
                <div style={{ background: '#1E2633', gridColumn: 'span 3', gridRow: 'span 2' }}></div>
                <div style={{ background: '#4DB8A6', opacity: 0.2 }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS */}
      <section id="projects" className="bg-light">
        <div className="grid">
          <div className="col-span-12">
            <span className="text-label">03 &mdash; ENGINEERING WORK</span>
            <h2 className="text-heading" style={{ color: 'var(--color-navy)' }}>PROJECTS</h2>
          </div>
          
          <div className="col-span-12 mt-16" style={{ borderTop: '1px solid rgba(15,23,42,0.1)', paddingTop: '4rem' }}>
            <div className="grid" style={{ padding: 0 }}>
              <div className="col-span-4 flex flex-col justify-between">
                <div>
                  <div className="text-label" style={{ color: 'var(--color-navy)' }}>PROJECT 01</div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1, color: 'var(--color-navy)', marginBottom: '1rem' }}>RISC-V CORE IMPL</h3>
                  <p className="text-body text-muted" style={{ fontSize: '1rem' }}>A custom-designed 32-bit RISC-V processor core optimized for low power consumption.</p>
                  
                  <div className="mt-8" style={{ borderTop: '1px solid rgba(15,23,42,0.1)', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>OBJECTIVE</p>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>Pipeline optimization and architecture.</p>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="micro-annotation" style={{ marginBottom: '0.5rem' }}>TECH: VERILOG &middot; ASIC</div>
                  <br/>
                  <div className="micro-annotation">STATUS: IN DEVELOPMENT</div>
                </div>
              </div>
              <div className="col-span-8 bg-dark relative flex items-center justify-center" style={{ height: '600px' }}>
                <span className="micro-annotation" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>[SIGNAL ACTIVE]</span>
                <div style={{ width: '60%' }}><SignalWaveform active={true} /></div>
                <p className="micro-annotation" style={{ position: 'absolute', bottom: '1rem', left: '1rem', border: 'none' }}>SIMULATION_WAVEFORM_01</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EVENTS */}
      <section id="events" className="bg-dark">
        <div className="grid">
          <div className="col-span-12">
            <span className="text-label">04 &mdash; SIGNALS IN THE COMMUNITY</span>
            <h2 className="text-heading">EVENTS</h2>
            <p className="text-body text-muted">LEARN. CONNECT. BUILD.</p>
          </div>
          
          <div className="col-span-8 mt-16 relative">
            {/* Featured Event */}
            <div style={{ background: '#1E2633', width: '100%', aspectRatio: '16/9' }}>
               {/* Image Placeholder */}
            </div>
            <div style={{ position: 'absolute', bottom: '-2rem', right: '-4rem', background: 'var(--color-navy)', padding: '3rem', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '400px' }}>
              <span className="micro-annotation" style={{ marginBottom: '1rem' }}>WORKSHOP_01</span>
              <h3 style={{ fontSize: '2rem', fontWeight: 600 }}>VLSI DESIGN WORKSHOP</h3>
              <p className="text-teal mt-2" style={{ color: 'var(--color-teal)' }}>September 2026</p>
              <p className="text-muted mt-4">An introductory workshop to SystemVerilog and RTL simulation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TEAM */}
      <section id="team" className="bg-light">
        <div className="grid">
          <div className="col-span-5">
            <span className="text-label">05 &mdash; HUMAN RESOURCES</span>
            <h2 className="text-heading" style={{ color: 'var(--color-navy)' }}>MEET THE<br/>CORE TEAM.</h2>
            <div className="micro-annotation mt-8">NODE_COUNT: 3</div>
          </div>
          
          <div className="col-span-12 mt-8">
            <div style={{ width: '100%', height: '70vh', background: 'var(--color-neutral)', position: 'relative' }}>
              {/* Massive Team Photo Placeholder */}
              <div style={{ position: 'absolute', top: '2rem', left: '2rem', borderLeft: '1px solid var(--color-teal)', borderTop: '1px solid var(--color-teal)', width: '20px', height: '20px' }}></div>
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', borderRight: '1px solid var(--color-teal)', borderBottom: '1px solid var(--color-teal)', width: '20px', height: '20px' }}></div>
              <span className="micro-annotation" style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: 'var(--color-light)', border: 'none' }}>X: 42.1 Y: 108.4</span>
            </div>
            
            <div className="grid mt-8" style={{ padding: 0, gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div style={{ borderTop: '1px solid rgba(15,23,42,0.1)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontWeight: 600, fontSize: '1.5rem', color: 'var(--color-navy)' }}>Arnav Bhandari</h4>
                <p className="text-muted mt-1">Technical Head</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(15,23,42,0.1)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontWeight: 600, fontSize: '1.5rem', color: 'var(--color-navy)' }}>Jane Doe</h4>
                <p className="text-muted mt-1">Research Lead</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(15,23,42,0.1)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontWeight: 600, fontSize: '1.5rem', color: 'var(--color-navy)' }}>John Smith</h4>
                <p className="text-muted mt-1">Operations Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FACULTY IN-CHARGE */}
      <section id="faculty" className="bg-neutral" style={{ backgroundColor: '#E2E8F0', padding: '8rem 0' }}>
        <div className="grid items-center">
          <div className="col-span-5">
            <div style={{ background: '#CBD5E1', width: '100%', aspectRatio: '3/4', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', borderBottom: '1px solid var(--color-navy)', borderRight: '1px solid var(--color-navy)', width: '40px', height: '40px' }}></div>
            </div>
          </div>
          <div className="col-span-6 col-start-7">
            <span className="text-label">06 &mdash; GUIDED BY EXPERIENCE</span>
            <h2 className="text-heading" style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>Dr. Alan Turing</h2>
            <p className="text-body" style={{ color: 'var(--color-teal)', fontWeight: 600, marginBottom: '2rem' }}>Faculty In-Charge &middot; EXTC Department</p>
            <p className="text-body text-muted">
              Bringing decades of academic and research experience to guide the next generation of semiconductor innovators.
            </p>
            <div className="mt-8">
              <span className="micro-annotation">STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONNECT - TAPEOUT */}
      <section id="connect" className="bg-dark" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }} ref={connectRef}>
        <div className="grid relative text-center items-center justify-center" style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Abstract SVG routing that draws itself */}
          <svg viewBox="0 0 400 200" style={{ width: '400px', marginBottom: '2rem' }}>
            <path className="tapeout-path anim-path" d="M0,100 L150,100 L150,50 L250,50 L250,100 L400,100" fill="none" stroke="#4DB8A6" strokeWidth="2" />
            <circle cx="200" cy="100" r="4" fill="#4DB8A6" />
          </svg>
          
          <h2 className="text-hero tapeout-text" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>READY FOR<br/>TAPEOUT?</h2>
          
          <div className="tapeout-text mt-8">
            <span className="micro-annotation" style={{ background: 'rgba(77,184,166,0.1)', border: '1px solid var(--color-teal)' }}>CONNECTION COMPLETE.</span>
          </div>

          <p className="tapeout-text text-body mt-16 text-muted">BUILD THE FUTURE WITH US.</p>

          <div className="tapeout-text flex mt-8" style={{ gap: '2rem' }}>
            <a href="#" className="btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <Instagram /> INSTAGRAM &rarr;
            </a>
            <a href="#" className="btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <Linkedin /> LINKEDIN &rarr;
            </a>
          </div>
          
          <p className="tapeout-text mt-16" style={{ fontSize: '0.85rem', color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
            &copy; 2026 DJS MICROMINDS VLSI CLUB
          </p>
        </div>
      </section>
    </div>
  );
}
