import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

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
      
      // HERO ENTRANCE TIMELINE
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
      // 0.65s — IDEAS reveals
      tl.from('.mask-ideas', { y: '100%', duration: 1, ease: 'power4.out' }, 0.65);
      // 0.80s — INTO reveals
      tl.from('.mask-into', { y: '100%', duration: 1, ease: 'power4.out' }, 0.80);
      // 0.95s — SILICON. reveals
      tl.from('.mask-silicon', { y: '100%', duration: 1, ease: 'power4.out' }, 0.95);
      // 1.15s — description appears
      tl.to('.hero-desc-typewriter', {
        text: "A student-driven VLSI community<br/>building ideas, exploring technology<br/>and creating a stronger tomorrow.",
        duration: 1.5,
        ease: 'none'
      }, 1.15);
      // 1.30s — buttons reveal
      tl.fromTo('.magnetic-wrap', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, 1.30);

      // Ambient Chip Sweep
      gsap.fromTo('.chip-sweep', 
        { x: '-100%' }, 
        { x: '200%', duration: 1.5, ease: 'power2.inOut', repeat: -1, repeatDelay: 8 }
      );

      // --- WHAT WE DO SCROLL REVEALS ---
      gsap.utils.toArray('.editorial-row').forEach((row: any) => {
        const num = row.querySelector('.editorial-number');
        const title = row.querySelector('.editorial-title');
        const desc = row.querySelector('.editorial-desc');
        const line = row.querySelector('.editorial-line');
        const signal = row.querySelector('.editorial-signal');

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        rowTl.fromTo(num, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" })
             .fromTo(title, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
             .fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
             .to(line, { width: "100%", duration: 1, ease: "power3.inOut" }, "-=0.2")
             .fromTo(signal, { x: 0, opacity: 1 }, { x: "100vw", opacity: 0, duration: 1.5, ease: "power2.in" }, "-=0.8");
      });

      // --- STATS COUNT UP ---
      const stats = gsap.utils.toArray('.stats-val');
      stats.forEach((stat: any) => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10);
        if (isNaN(target)) return;
        gsap.fromTo(stat, 
          { innerHTML: 0 }, 
          {
            innerHTML: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat.parentElement,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            snap: { innerHTML: 1 }
          }
        );
      });

      // --- EVENT PROMO ---
      const eventTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#event-promo",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      eventTl.fromTo('.event-giant-date', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "power4.out" })
             .fromTo('.event-title-1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5")
             .fromTo('.event-title-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
             .fromTo('.event-circuit', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, "-=0.2")
             .fromTo('.event-desc', { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=1.0")
             .fromTo('.event-btn', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.8");

      // --- TEAM PHOTO ---
      gsap.fromTo('.team-scanline', 
        { y: 0, opacity: 1 }, 
        { 
          y: '80vh', 
          opacity: 0, 
          duration: 2, 
          ease: "none", 
          scrollTrigger: {
            trigger: ".team-photo-container",
            start: "top center",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.team-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".team-heading", start: "top 85%" } }
      );

      // --- ECOSYSTEM HOVER (Vanilla JS logic in React) ---

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



      // Magnetic Buttons
      if (!prefersReducedMotion) {
        const buttons = document.querySelectorAll('.magnetic-btn');
        buttons.forEach((btn) => {
          btn.addEventListener('mousemove', (e: any) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
          });
          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
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
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;
    
    gsap.to('.hero-content-area', {
      rotationY: xPos * 2,
      rotationX: -yPos * 2,
      duration: 1,
      ease: 'power2.out'
    });
  };

  const handleHeroMouseLeave = () => {
    gsap.to('.hero-content-area', {
      x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 1.5, ease: 'power3.out'
    });
  };



  return (
    <div ref={containerRef} style={{ backgroundColor: '#040D14', color: '#F8FAFC' }}>
      
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

      {/* NAVIGATION */}


      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="hero-wrapper" 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{ minHeight: '100vh', display: 'flex', flexWrap: 'wrap', alignItems: 'center', paddingTop: '6rem', paddingBottom: '8rem', backgroundColor: '#040D14' }}
      >
        <div ref={bgRef} style={{ position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%', pointerEvents: 'none', zIndex: 0, opacity: 0.5 }}>
           <svg width="100%" height="100%">
              <path id="bg-path-1" d="M 0 200 L 200 200 L 400 400 L 800 400" fill="none" stroke="rgba(77, 184, 166, 0.3)" strokeWidth="2" />
              <path d="M 0 200 L 200 200 L 400 400 L 800 400" fill="none" stroke="var(--color-teal)" strokeWidth="4" strokeDasharray="50 1000" style={{ animation: 'electric-zap 8s infinite linear', filter: 'drop-shadow(0 0 10px var(--color-teal))' }} />
              <path id="bg-path-2" d="M 1200 0 L 1200 200 L 900 500 L 900 1000" fill="none" stroke="rgba(77, 184, 166, 0.3)" strokeWidth="2" />
              <path d="M 1200 0 L 1200 200 L 900 500 L 900 1000" fill="none" stroke="var(--color-teal)" strokeWidth="4" strokeDasharray="30 1500" style={{ animation: 'electric-zap 12s infinite linear 2s', filter: 'drop-shadow(0 0 10px var(--color-teal))' }} />
              
              <circle cx="200" cy="200" r="3" fill="var(--color-teal)" className="circuit-node" />
              <circle cx="400" cy="400" r="3" fill="var(--color-teal)" className="circuit-node" />
              <circle cx="900" cy="500" r="4" fill="var(--color-teal)" className="circuit-node" />
           </svg>
        </div>

        <div className="hero-content-area w-full" style={{ position: 'relative', zIndex: 1, paddingLeft: '4rem', gridTemplateColumns: '4fr 8fr', display: 'grid' }}>
          
          <div className="flex flex-col justify-center relative">
            <h1 className="text-hero" ref={heroTextRef} style={{ display: 'inline-block', perspective: 1000, lineHeight: 0.85, margin: 0, marginTop: '4rem' }}>
              <span className="text-mask-wrapper"><span className="text-mask-content mask-ideas">IDEAS</span></span>
              <span className="text-mask-wrapper"><span className="text-mask-content mask-into">INTO</span></span>
              <span className="text-mask-wrapper"><span className="text-mask-content text-teal mask-silicon">SILICON.</span></span>
            </h1>
            
            <p className="hero-desc hero-desc-typewriter" style={{ marginTop: '2rem', minHeight: '4.5rem' }}></p>
            
            <div className="flex mt-4" style={{ gap: '1rem' }}>
              <div className="magnetic-wrap"><Link to="/vision" className="btn btn-primary hero-text-anim magnetic-btn">OUR VISION &rarr;</Link></div>
              <div className="magnetic-wrap"><Link to="/team" className="btn hero-text-anim magnetic-btn">MEET THE TEAM</Link></div>
            </div>
          </div>
          
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

            {bursts.map(burst => (
              <svg key={burst.id} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20 }}>
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2 + (Math.random() * 0.5);
                  const length = 200 + Math.random() * 400;
                  const x2 = burst.x + Math.cos(angle) * length;
                  const y2 = burst.y + Math.sin(angle) * length;
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

      {/* 2. WHAT WE DO */}
      <section id="what-we-do" className="grid" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="col-span-12">
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 900, fontFamily: 'var(--font-creative)', marginBottom: '4rem' }}>
            WE LEARN.<br/>
            WE BUILD.<br/>
            WE GROW.
          </h2>
          <p className="text-body text-muted" style={{ maxWidth: '600px', marginBottom: '8rem' }}>
            MicroMinds is a student-driven VLSI community focused on learning, experimentation, projects, competitions, research, and collaboration.
          </p>

          <div className="editorial-row">
            <div className="editorial-number">01</div>
            <div className="editorial-title">LEARN</div>
            <div className="editorial-desc">Workshops, seminars, hands-on sessions and strong VLSI fundamentals.</div>
            <div className="editorial-line"></div>
            <div className="editorial-signal"></div>
          </div>
          
          <div className="editorial-row">
            <div className="editorial-number">02</div>
            <div className="editorial-title">BUILD</div>
            <div className="editorial-desc">Turning concepts into practical hardware projects and experimentation.</div>
            <div className="editorial-line"></div>
            <div className="editorial-signal"></div>
          </div>

          <div className="editorial-row">
            <div className="editorial-number">03</div>
            <div className="editorial-title">GROW</div>
            <div className="editorial-desc">Competitions, research, collaboration, industry exposure and community.</div>
            <div className="editorial-line"></div>
            <div className="editorial-signal"></div>
          </div>
        </div>
      </section>

      {/* 3. STATS */}
      <section id="stats" style={{ padding: '8rem 2rem', background: '#0A121D', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="grid" style={{ padding: 0 }}>
          <div className="col-span-3">
            <div className="stats-number">2026</div>
            <div className="stats-label">TEAM YEAR</div>
          </div>
          <div className="col-span-3">
            <div className="stats-number">0<span className="stats-val" data-target="2">0</span>+</div>
            <div className="stats-label">PROJECTS</div>
          </div>
          <div className="col-span-3">
            <div className="stats-number">0<span className="stats-val" data-target="1">0</span></div>
            <div className="stats-label">UPCOMING WORKSHOP</div>
          </div>
          <div className="col-span-3">
            <div className="stats-number" style={{ fontSize: '10rem', lineHeight: 0.7 }}>&infin;</div>
            <div className="stats-label">IDEAS</div>
          </div>
        </div>
      </section>

      {/* 4. EVENT PROMO */}
      <section id="event-promo" style={{ padding: '12rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
          <path className="event-circuit" d="M 0 0 L 200 200 L 200 600 L 400 800" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" />
        </svg>
        <div className="grid" style={{ alignItems: 'center', padding: 0 }}>
          <div className="col-span-5 relative">
            <div className="event-giant-date">27</div>
          </div>
          <div className="col-span-7">
            <span className="text-label" style={{ marginBottom: '2rem', display: 'block' }}>WHAT'S HAPPENING</span>
            <div className="event-title event-title-1">SEPTEMBER 2026</div>
            <div className="event-title event-title-2" style={{ color: 'var(--color-teal)' }}>FPGA WORKSHOP</div>
            
            <p className="event-desc text-muted mt-8" style={{ fontSize: '1.25rem', maxWidth: '500px' }}>
              <strong>DJS MicroMinds VLSI Club</strong><br/><br/>
              A hands-on FPGA workshop introducing participants to digital design and FPGA development.
            </p>
            
            <div className="event-btn mt-8">
              <Link to="/events" className="btn btn-primary">VIEW EVENT &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM PHOTO */}
      <section id="team-promo" style={{ padding: '8rem 2rem' }}>
        <div className="grid" style={{ padding: 0 }}>
          <div className="col-span-12 team-heading mb-8 flex justify-between items-end">
            <h2 className="text-heading" style={{ margin: 0 }}>THE PEOPLE<br/>BEHIND MICROMINDS.</h2>
            <Link to="/team" className="btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>MEET THE TEAM &rarr;</Link>
          </div>
          <div className="col-span-12 team-photo-container">
            <img src="/team/Team_photo.jpeg" alt="DJS MicroMinds Team" className="team-photo" />
            <div className="team-scanline"></div>
          </div>
        </div>
      </section>


      {/* INSTITUTIONAL FOOTER */}
      <section id="institutional-footer" style={{ padding: '6rem 2rem 1.5rem 2rem', background: '#02060C', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle Background Circuit */}
        <svg style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '100%', pointerEvents: 'none', opacity: 0.05, zIndex: 0 }}>
          <path d="M 100 0 L 100 150 L 300 300" fill="none" stroke="var(--color-teal)" strokeWidth="1" />
          <circle cx="300" cy="300" r="2" fill="var(--color-teal)" className="circuit-pulse" />
        </svg>

        <div className="relative z-10" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="institutional-footer-grid">
            
            {/* Column 1 - ABOUT */}
            <div className="footer-col-about">
              <div className="title-font flex items-center" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                DJS MICROMINDS <div className="footer-pulse"></div>
              </div>
              <div className="text-muted font-semibold" style={{ letterSpacing: '0.1em', marginBottom: '1.5rem', fontSize: '0.9rem' }}>VLSI CLUB</div>
              
              <p className="text-muted" style={{ maxWidth: '280px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                A student-driven VLSI community building ideas, exploring technology and creating together.
              </p>
            </div>

            {/* Column 2 - USEFUL LINKS */}
            <div className="footer-col-links">
              <h4 className="footer-inst-title text-teal">USEFUL LINKS</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link to="/" className="inst-link">Home</Link>
                <Link to="/vision" className="inst-link">Vision</Link>
                <Link to="/projects" className="inst-link">Projects</Link>
                <Link to="/events" className="inst-link">Events</Link>
                <Link to="/team" className="inst-link">Team</Link>
              </nav>
            </div>

            {/* Column 3 - FOLLOW US */}
            <div className="footer-col-social">
              <h4 className="footer-inst-title text-teal">FOLLOW US</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="https://www.instagram.com/djs.microminds?stkn=dXlzbGxqNWZmZ20y" target="_blank" rel="noopener noreferrer" className="inst-social-link">
                  <Instagram /> Instagram
                </a>
                <a href="https://www.linkedin.com/company/djs-microminds/" target="_blank" rel="noopener noreferrer" className="inst-social-link">
                  <Linkedin /> LinkedIn
                </a>
              </nav>
            </div>

          </div>

          <div className="footer-copyright-bar">
            &copy; 2026 DJS MicroMinds VLSI Club
          </div>
          
        </div>
      </section>



    </div>
  );
}
