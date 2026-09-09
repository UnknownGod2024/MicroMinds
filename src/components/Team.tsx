import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faculty, leadership, departments, type TeamMember } from '../data/team';

gsap.registerPlugin(ScrollTrigger);

// Sophisticated Placeholder Component
const PortraitPlaceholder = ({ name, role, className = "", image, linkedin }: { name?: string, role?: string, className?: string, image?: string, linkedin?: string }) => (
  <div className={`team-placeholder ${className}`} style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #071A4A, #1649C7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
    {image && image.trim() !== "" && !image.includes("faculty.jpg") && !image.includes("chairperson.jpg") && !image.includes("vcp.jpg") && !image.includes("secretary.jpg") && !image.includes("treasurer.jpg") && !image.includes("_head.jpg") && !image.includes("_sub_") ? (
      <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
    ) : (
      <>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top right, rgba(36,184,168,0.2) 0%, transparent 60%)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(#24B8A8 1px, transparent 1px)', backgroundSize: '15px 15px', opacity: 0.1, zIndex: 1 }}></div>
        <span style={{ fontSize: '4rem', fontWeight: 300, color: 'rgba(255,255,255,0.1)', zIndex: 2, userSelect: 'none' }}>μ</span>
      </>
    )}
    {linkedin && (
      <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 4, background: 'rgba(7, 26, 74, 0.7)', padding: '0.4rem', borderRadius: '50%', backdropFilter: 'blur(4px)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }} className="linkedin-link" onClick={(e) => e.stopPropagation()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
    )}
    {name && (
      <div className="placeholder-info" style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 3, opacity: 0, transform: 'translateY(10px)', transition: 'all 0.3s ease', padding: '0.5rem', background: 'rgba(7, 26, 74, 0.7)', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>{name}</div>
        <div style={{ fontSize: '0.65rem', fontWeight: 500, color: '#24B8A8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{role}</div>
      </div>
    )}
  </div>
);
const heroNodes = [
  { label: 'LEARN', angle: 270, radius: 250 },
  { label: 'BUILD', angle: 342, radius: 250 },
  { label: 'CREATE', angle: 54, radius: 250 },
  { label: 'CONNECT', angle: 126, radius: 250 },
  { label: 'GROW', angle: 198, radius: 250 },
];

const TeamHero3D = () => {
  return (
    <div className="team-hero-3d-container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
       {/* Ambient soft glow */}
       <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(36, 184, 168, 0.15) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}></div>
       
       <div className="hero-asset-container" style={{ position: 'relative', width: '600px', height: '600px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d' }}>
          
          {/* Orbital Network */}
          <div className="orbit-system" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transformStyle: 'preserve-3d', pointerEvents: 'none' }}>
             <svg viewBox="-50 -50 700 700" style={{ position: 'absolute', top: '50%', left: '50%', width: '120%', height: '120%', transform: 'translate(-50%, -50%)', overflow: 'visible' }}>
                <g className="orbit-ring-group-1" style={{ transformOrigin: '300px 300px' }}>
                   <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(36, 184, 168, 0.4)" strokeWidth="1" strokeDasharray="4 8" />
                </g>
             </svg>
             <div className="orbit-nodes-group" style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', transform: 'translate(-50%, -50%)', transformStyle: 'preserve-3d' }}>
                {heroNodes.map((node) => {
                   const x = 300 + node.radius * Math.cos(node.angle * Math.PI / 180);
                   const y = 300 + node.radius * Math.sin(node.angle * Math.PI / 180);
                   return (
                     <div key={node.label} className="orbit-node-container" style={{ position: 'absolute', left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)', transformStyle: 'preserve-3d' }}>
                        <div className="orbit-node-counter" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d' }}>
                            <div className="orbit-node-glass" style={{
                              width: '8px', height: '8px',
                              background: '#24B8A8',
                              borderRadius: '50%',
                              boxShadow: '0 0 10px #24B8A8, 0 0 20px rgba(36,184,168,0.5)',
                              position: 'relative'
                            }}></div>
                            <div style={{ position: 'absolute', top: '150%', left: '50%', transform: 'translateX(-50%)', fontSize: '0.85rem', fontFamily: 'var(--font-creative)', fontWeight: 600, letterSpacing: '0.15em', color: '#071A4A', textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
                              {node.label}
                            </div>
                        </div>
                     </div>
                   )
                })}
             </div>
          </div>

          {/* Parallax Asset */}
          <img src="/hero-core.png" alt="MicroMinds Core" className="hero-3d-asset" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'darken', filter: 'contrast(1.05)', position: 'relative', zIndex: 10, WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 65%)', maskImage: 'radial-gradient(circle, black 40%, transparent 65%)' }} />
          
          {/* Floating glowing orbs around the asset */}
          <div className="hero-orb hero-orb-1" style={{ position: 'absolute', top: '20%', left: '15%', width: '12px', height: '12px', background: '#24B8A8', borderRadius: '50%', filter: 'blur(4px)', opacity: 0.6, transform: 'translateZ(50px)' }}></div>
          <div className="hero-orb hero-orb-2" style={{ position: 'absolute', top: '75%', left: '80%', width: '18px', height: '18px', background: '#1649C7', borderRadius: '50%', filter: 'blur(6px)', opacity: 0.5, transform: 'translateZ(30px)' }}></div>
          <div className="hero-orb hero-orb-3" style={{ position: 'absolute', top: '80%', left: '20%', width: '10px', height: '10px', background: '#24B8A8', borderRadius: '50%', filter: 'blur(3px)', opacity: 0.8, transform: 'translateZ(80px)' }}></div>
       </div>
    </div>
  );
};

const MemberCard = ({ member, width, height }: { member: any, width: string, height: string }) => (
  <div className="dept-member" style={{ width, display: 'flex', flexDirection: 'column' }} onClick={() => {}}>
    <div className="member-photo-container" style={{ width: '100%', height, border: '1px solid #EAF1FF', boxShadow: '0 10px 20px rgba(7,26,74,0.05)', overflow: 'hidden', position: 'relative', marginBottom: '1rem', transition: 'border-color 0.3s ease' }}>
       <PortraitPlaceholder name={member.name} role={member.role} image={member.image} linkedin={member.linkedin} />
    </div>
    <div className="member-info" style={{ transition: 'transform 0.3s ease' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: member.type==='HEAD' ? '#1649C7' : '#24B8A8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{member.role}</div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#071A4A', position: 'relative', display: 'inline-block' }}>
        {member.name}
        <div className="member-hover-line" style={{ position: 'absolute', bottom: '-4px', left: 0, height: '2px', width: '0%', background: '#24B8A8', transition: 'width 0.3s ease' }}></div>
      </div>
    </div>
  </div>
);

const renderDepartmentLayout = (dept: any) => {
  const allMembers = [
    ...dept.heads.map((m: any) => ({ ...m, type: 'HEAD' })),
    ...dept.subHeads.map((m: any) => ({ ...m, type: 'SUB HEAD' }))
  ];
  
  const w = "260px";
  const h = "340px";
  
  if (dept.id === '01') {
     return <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {allMembers.map((m, i) => <MemberCard key={i} member={m} width={w} height={h} />)}
     </div>
  }
  if (dept.id === '02') {
     return <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {allMembers.map((m, i) => <div key={i} style={{ transform: `translateY(${i===0 ? '0' : '40px'})` }}><MemberCard member={m} width={w} height={h} /></div>)}
     </div>
  }
  if (dept.id === '03') {
     return <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {allMembers.map((m, i) => <div key={i} style={{ transform: `translateY(${i%2!==0 ? '40px' : '0'})` }}><MemberCard member={m} width={w} height={h} /></div>)}
     </div>
  }
  if (dept.id === '04') {
     return <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {allMembers.map((m, i) => <MemberCard key={i} member={m} width={w} height={h} />)}
     </div>
  }
  if (dept.id === '05') {
     return <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {allMembers.map((m, i) => <div key={i} style={{ transform: `translateY(${i===1 ? '40px' : '0'})` }}><MemberCard member={m} width={w} height={h} /></div>)}
     </div>
  }
  if (dept.id === '06') {
     return <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {allMembers.map((m, i) => <MemberCard key={i} member={m} width={w} height={h} />)}
     </div>
  }
  
  return <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
     {allMembers.map((m, i) => <MemberCard key={i} member={m} width={w} height={h} />)}
  </div>
}

export function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    let ctx = gsap.context(() => {
      // 4. HERO ANIMATION
      const tl = gsap.timeline();
      // 0.00s background appears (handled by CSS)
      // 0.10s vertical line draws
      tl.fromTo('.team-hero-line', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', duration: 0.5, ease: 'power3.out' }, 0.10);
      // 0.20s eyebrow reveals
      tl.fromTo('.team-hero-eyebrow', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.20);
      // 0.30s THE PEOPLE reveals
      tl.fromTo('.team-hero-title-1', { y: 100, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, 
                { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.6, ease: 'power3.out' }, 0.30);
      // 0.45s BEHIND reveals
      tl.fromTo('.team-hero-title-2', { y: 100, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, 
                { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.6, ease: 'power3.out' }, 0.45);
      // 0.60s MICROMINDS reveals
      tl.fromTo('.team-hero-title-3', { y: 100, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, 
                { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.6, ease: 'power3.out' }, 0.60);
      // 0.75s supporting text appears
      tl.fromTo('.team-hero-support', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.75);
      // 0.80s 3D Entrance Sequence
      tl.fromTo('.team-hero-3d-container', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }, 0.15);
      
      // Continuous 3D Animations
      gsap.to('.hero-3d-asset', { y: 15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-orb-1', { y: -20, x: 10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-orb-2', { y: 20, x: -15, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
      gsap.to('.hero-orb-3', { y: -15, x: -10, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
      
      // Node orbiting
      gsap.to('.orbit-ring-group-1', { rotationZ: 360, duration: 30, repeat: -1, ease: 'none' });
      gsap.to('.orbit-nodes-group', { rotationZ: 360, duration: 30, repeat: -1, ease: 'none' });
      gsap.to('.orbit-node-counter', { rotationZ: -360, duration: 30, repeat: -1, ease: 'none' });

      // Scroll cue fade
      gsap.to('.hero-scroll-cue', {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: '.team-hero-bg',
          start: 'top top',
          end: '+=200',
          scrub: true
        }
      });
      
      // DEPARTMENTS SCROLL
      gsap.to('.dept-scroll-indicator', {
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.departments-section',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });
      
      const deptRows = gsap.utils.toArray('.dept-row');
      deptRows.forEach((row: any) => {
        const num = row.querySelector('.dept-num');
        const title = row.querySelector('.dept-title');
        const line = row.querySelector('.dept-divider');
        const members = row.querySelectorAll('.dept-member');

        const dTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
          }
        });
        
        dTl.fromTo(num, { opacity: 0, y: 30 }, { opacity: 0.05, y: 0, duration: 0.6, ease: 'power2.out' }, 0);
        dTl.fromTo(title, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 0.2);
        dTl.fromTo(line, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 0.8, ease: 'power2.out' }, 0.3);
        if (members.length > 0) {
          dTl.fromTo(members, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.2)' }, 0.4);
        }
      });

      // TEAM INTRO
      const introTl = gsap.timeline({ scrollTrigger: { trigger: '.team-intro', start: 'top 70%' } });
      introTl.fromTo('.intro-heading', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
             .fromTo('.intro-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
      
      const introWords = gsap.utils.toArray('.intro-word');
      introWords.forEach((word: any, i: number) => {
        ScrollTrigger.create({
          trigger: word,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => gsap.to(word, { color: '#1649C7', x: 20, duration: 0.4 }),
          onLeaveBack: () => gsap.to(word, { color: '#718096', x: 0, duration: 0.4 })
        });
        if (i < introWords.length - 1) {
          gsap.fromTo(`.intro-word-conn-${i}`, 
             { scaleY: 0 }, 
             { scaleY: 1, transformOrigin: 'top', duration: 0.5, scrollTrigger: { trigger: word, start: 'top 50%' } }
           );
        }
      });

      // FACULTY
      const facTl = gsap.timeline({ scrollTrigger: { trigger: '.faculty-section', start: 'top 75%' } });
      facTl.fromTo('.fac-label', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
           .fromTo('.fac-img', { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.05 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.8, ease: 'power3.out' }, "-=0.2")
           .fromTo('.fac-line', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 0.5 }, "-=0.4")
           .fromTo('.fac-text', { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.2");

      // LEADERSHIP - CHAIRPERSON
      const chTl = gsap.timeline({ scrollTrigger: { trigger: '.chairperson-section', start: 'top 75%' } });
      chTl.fromTo('.ch-img-wrap', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.inOut' })
          .fromTo('.ch-img', { scale: 1.06 }, { scale: 1, duration: 0.8, ease: 'power3.out' }, "-=0.8")
          .fromTo('.ch-line', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', duration: 0.6 }, "-=0.4")
          .fromTo('.ch-num', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 }, "-=0.2")
          .fromTo('.ch-role', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
          .fromTo('.ch-name', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
          .fromTo('.ch-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      // LEADERSHIP - VICE CHAIRPERSON
      const vcpTl = gsap.timeline({ scrollTrigger: { trigger: '.vcp-section', start: 'top 75%' } });
      vcpTl.fromTo('.vcp-img-wrap', { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.inOut' })
           .fromTo('.vcp-img', { scale: 1.06 }, { scale: 1, duration: 0.8, ease: 'power3.out' }, "-=0.8")
           .fromTo('.vcp-text', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");

      // LEADERSHIP - SUB CORE (Grid)
      const subTl = gsap.timeline({ scrollTrigger: { trigger: '.sub-core-section', start: 'top 80%' } });
      subTl.fromTo('.sub-core-item', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' });

      // DEPARTMENTS
      const deptTl = gsap.timeline({ scrollTrigger: { trigger: '.departments-section', start: 'top 75%' } });
      deptTl.fromTo('.dept-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
            .fromTo('.dept-row', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 }, "-=0.2");

      // VALUES
      const valTl = gsap.timeline({ scrollTrigger: { trigger: '.values-section', start: 'top 70%' } });
      valTl.fromTo('.val-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 })
           .fromTo('.val-word', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)' }, "-=0.2");



    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth <= 900) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;
    
    gsap.to('.hero-asset-container', {
      x: xPos * 20,
      y: yPos * 20,
      rotationY: xPos * 10,
      rotationX: -yPos * 10,
      duration: 1,
      ease: 'power3.out'
    });
  };

  const handleHeroMouseLeave = () => {
    gsap.to('.hero-asset-container', {
      x: 0, y: 0, rotationY: 0, rotationX: 0, duration: 1.5, ease: 'power3.out'
    });
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: '#FFFFFF', color: '#071A4A', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Navbar */}
      <nav className="vision-navbar team-navbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '1.5rem 4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(7, 26, 74, 0.05)' }}>
        <div style={{ position: 'absolute', left: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo_2.png" alt="MicroMinds" style={{ height: '48px', filter: 'invert(1)' }} />
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: '#071A4A' }}>
            DJS MICROMINDS<br/><span style={{ color: '#1649C7', fontWeight: 400 }}>TEAM</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" className="nav-link" style={{ color: '#071A4A', fontWeight: 500, fontSize: '0.85rem' }}>Home</Link>
          <Link to="/vision" className="nav-link" style={{ color: '#071A4A', fontWeight: 500, fontSize: '0.85rem' }}>Vision</Link>
          <div className="nav-link nav-active" style={{ color: '#24B8A8', fontWeight: 600, fontSize: '0.85rem', position: 'relative' }}>Team</div>
        </div>
      </nav>

      {/* 3. TEAM HERO */}
      <section onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave} style={{ minHeight: '100vh', position: 'relative', paddingTop: '10rem', overflow: 'hidden' }}>
        
        {/* Abstract subtle background */}
        <div className="team-hero-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at right center, #EAF1FF 0%, transparent 60%)', zIndex: 0 }}></div>
        


        <div className="grid" style={{ height: '100%', position: 'relative', zIndex: 2, alignItems: 'center' }}>
          {/* Left Text */}
          <div className="col-span-6 team-hero-foreground" style={{ display: 'flex', flexDirection: 'column', paddingRight: '2rem' }}>
            <div className="team-hero-line" style={{ width: '2px', height: '60px', background: '#24B8A8', marginBottom: '2rem' }}></div>
            <h1 style={{ fontSize: 'clamp(3.5rem, 6.5vw, 7.5rem)', fontFamily: 'var(--font-creative)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.02em', color: '#071A4A', margin: 0 }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.2rem' }}><div className="team-hero-title-1">THE PEOPLE</div></div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.2rem' }}><div className="team-hero-title-2" style={{ color: '#24B8A8' }}>BEHIND</div></div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.2rem' }}><div className="team-hero-title-3">MICROMINDS.</div></div>
            </h1>
            <p className="team-hero-support" style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#718096', marginTop: '4rem', fontWeight: 500, borderLeft: '1px solid #EAF1FF', paddingLeft: '1.5rem' }}>
              Different minds.<br/>
              One community.<br/>
              Building what comes next.
            </p>
            
            <div className="hero-scroll-cue" style={{ marginTop: 'auto', paddingTop: '6rem', display: 'flex', alignItems: 'center', gap: '1rem', color: '#1649C7' }}>
              <div className="scroll-arrow" style={{ fontSize: '1rem', fontWeight: 800 }}>&darr;</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em' }}>MEET THE TEAM</div>
            </div>
          </div>

          {/* Right 3D Visual */}
          <div className="col-span-6" style={{ position: 'relative', height: '600px' }}>
             <TeamHero3D />
             
             <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', textAlign: 'right', zIndex: 10 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#071A4A', letterSpacing: '0.1em' }}>2026–27</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 500, color: '#718096', letterSpacing: '0.15em' }}>ONE TEAM &middot; MANY MINDS</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TEAM INTRO */}
      <section className="team-intro" style={{ padding: '8rem 4rem', backgroundColor: '#F7F9FC' }}>
        <div className="grid">
          <div className="col-span-5">
            <h2 className="intro-heading" style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#071A4A' }}>
              MORE THAN<br/><span style={{ color: '#1649C7' }}>A TEAM.</span>
            </h2>
            <p className="intro-desc" style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#718096', marginTop: '2rem' }}>
              MicroMinds is driven by students who learn, build, organise and create together.
            </p>
          </div>
          <div className="col-span-6 col-start-7" style={{ position: 'relative' }}>
             {['LEARN', 'BUILD', 'LEAD', 'CREATE'].map((word, i) => (
                <div key={word} style={{ marginBottom: '2rem', position: 'relative' }}>
                  <div className="intro-word" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#718096', letterSpacing: '0.05em' }}>
                    {word}
                  </div>
                  {i < 3 && (
                    <div className={`intro-word-conn-${i}`} style={{ position: 'absolute', top: '100%', left: '20px', width: '2px', height: '2rem', background: 'rgba(36, 184, 168, 0.3)', marginTop: '0.25rem' }}></div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 7. FACULTY SECTION */}
      <section className="faculty-section" style={{ padding: '8rem 4rem', backgroundColor: '#FFFFFF' }}>
        <div className="grid">
          <div className="col-span-12 fac-label" style={{ marginBottom: '4rem' }}>
          </div>
          
          <div className="col-span-5 relative" style={{ height: '500px' }}>
            <div className="fac-img" style={{ width: '100%', height: '100%' }}>
               <PortraitPlaceholder name={faculty.name} role={faculty.role} image={faculty.image} linkedin={faculty.linkedin} />
            </div>
            <div className="fac-line" style={{ position: 'absolute', top: '50%', right: '-100px', width: '100px', height: '1px', background: '#1649C7' }}></div>
          </div>
          
          <div className="col-span-6 col-start-7" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="fac-text" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#071A4A', marginBottom: '2rem' }}>THE GUIDING FORCE.</h3>
            <div className="fac-text" style={{ paddingLeft: '2rem', borderLeft: '2px solid #EAF1FF' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1649C7' }}>{faculty.name}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#718096', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5rem' }}>{faculty.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LEADERSHIP SECTION */}
      <section className="leadership-section" style={{ padding: '8rem 4rem', backgroundColor: '#F7F9FC' }}>
        <div className="grid">
          <div className="col-span-12 fac-label" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#071A4A', lineHeight: 1.1, marginTop: '1rem' }}>
              THE PEOPLE<br/>SETTING THE DIRECTION.
            </h2>
          </div>
        </div>

        {/* CHAIRPERSON */}
        <div className="chairperson-section grid" style={{ marginTop: '6rem', alignItems: 'center' }}>
          <div className="col-span-5" style={{ height: '600px', overflow: 'hidden' }}>
            <div className="ch-img-wrap" style={{ width: '100%', height: '100%' }}>
              <div className="ch-img portrait-hover" style={{ width: '100%', height: '100%' }}>
                <PortraitPlaceholder name={leadership.chairperson.name} role={leadership.chairperson.role} image={leadership.chairperson.image} linkedin={leadership.chairperson.linkedin} />
              </div>
            </div>
          </div>
          <div className="col-span-6 col-start-7" style={{ position: 'relative' }}>
            <div className="ch-line" style={{ position: 'absolute', top: '-4rem', left: '2rem', width: '2px', height: '60px', background: '#24B8A8' }}></div>
            <div className="ch-num" style={{ fontSize: '2rem', fontWeight: 800, color: '#EAF1FF', position: 'absolute', top: '-3rem', left: '-1rem', zIndex: 0 }}>01</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="ch-role" style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.15em', color: '#24B8A8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{leadership.chairperson.role}</div>
              <div className="ch-name" style={{ fontSize: '3.5rem', fontWeight: 800, color: '#071A4A', lineHeight: 1, marginBottom: '2rem' }}>{leadership.chairperson.name}</div>
              <p className="ch-desc" style={{ fontSize: '1.25rem', color: '#718096', lineHeight: 1.6, fontWeight: 500 }}>
                Leading the community.<br/>
                Shaping the direction.<br/>
                <span style={{ color: '#1649C7' }}>Building what comes next.</span>
              </p>
            </div>
          </div>
        </div>

        {/* VICE CHAIRPERSON */}
        <div className="vcp-section grid" style={{ marginTop: '10rem', alignItems: 'center' }}>
          <div className="col-span-5 col-start-2 vcp-text" style={{ textAlign: 'right', position: 'relative' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EAF1FF', position: 'absolute', top: '-3rem', right: '-1rem', zIndex: 0 }}>02</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.15em', color: '#24B8A8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{leadership.viceChairperson.role}</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#071A4A', lineHeight: 1 }}>{leadership.viceChairperson.name}</div>
            </div>
          </div>
          <div className="col-span-5 col-start-8" style={{ height: '500px', overflow: 'hidden' }}>
            <div className="vcp-img-wrap" style={{ width: '100%', height: '100%' }}>
              <div className="vcp-img portrait-hover" style={{ width: '100%', height: '100%' }}>
                <PortraitPlaceholder name={leadership.viceChairperson.name} role={leadership.viceChairperson.role} image={leadership.viceChairperson.image} linkedin={leadership.viceChairperson.linkedin} />
              </div>
            </div>
          </div>
        </div>

        {/* SUB CORE */}
        <div className="sub-core-section grid" style={{ marginTop: '10rem', rowGap: '4rem' }}>
          {/* Secretary */}
          <div className="col-span-4 sub-core-item">
            <div className="portrait-hover" style={{ height: '480px', marginBottom: '1.5rem' }}>
               <PortraitPlaceholder name={leadership.secretary.name} role={leadership.secretary.role} image={leadership.secretary.image} linkedin={leadership.secretary.linkedin} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#24B8A8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{leadership.secretary.role}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#071A4A' }}>{leadership.secretary.name}</div>
          </div>
          
          {/* Joint Secretary */}
          <div className="col-span-4 sub-core-item" style={{ marginTop: '6rem' }}>
            <div className="portrait-hover" style={{ height: '380px', marginBottom: '1.5rem' }}>
               <PortraitPlaceholder name={leadership.jointSecretary.name} role={leadership.jointSecretary.role} image={leadership.jointSecretary.image} linkedin={leadership.jointSecretary.linkedin} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#24B8A8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{leadership.jointSecretary.role}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#071A4A' }}>{leadership.jointSecretary.name}</div>
          </div>
          
          {/* Treasurer */}
          <div className="col-span-4 sub-core-item" style={{ marginTop: '2rem' }}>
            <div className="portrait-hover" style={{ height: '420px', marginBottom: '1.5rem' }}>
               <PortraitPlaceholder name={leadership.treasurer.name} role={leadership.treasurer.role} image={leadership.treasurer.image} linkedin={leadership.treasurer.linkedin} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#24B8A8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{leadership.treasurer.role}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#071A4A' }}>{leadership.treasurer.name}</div>
          </div>
        </div>
      </section>

      {/* 12. DEPARTMENTS */}
      <section className="departments-section" style={{ padding: '8rem 4rem', backgroundColor: '#FFFFFF', position: 'relative' }}>
        
        {/* Global Hover CSS for member cards */}
        <style>{`
          .dept-member { cursor: pointer; }
          .dept-member:hover .member-photo-container { border-color: #24B8A8 !important; }
          .dept-member:hover .member-photo-container img { transform: scale(1.03); }
          .dept-member:hover .member-info { transform: translateY(-5px); }
          .dept-member:hover .member-hover-line { width: 100% !important; }
          .dept-member:hover .placeholder-info, .dept-member:active .placeholder-info { opacity: 1 !important; transform: translateY(0) !important; }
          .member-photo-container img { transition: transform 0.4s ease; }
          .linkedin-link:hover { background: #1649C7 !important; transform: scale(1.1) !important; }
        `}</style>
        
        {/* Scroll Progress Line */}
        <div style={{ position: 'absolute', left: '4rem', top: '15rem', bottom: '8rem', width: '1px', background: '#EAF1FF', zIndex: 0 }}>
          <div className="dept-scroll-indicator" style={{ position: 'absolute', top: 0, left: '-4px', width: '9px', height: '9px', borderRadius: '50%', background: '#24B8A8' }}></div>
        </div>

        <div className="grid">
          <div className="col-span-12 dept-header" style={{ marginBottom: '6rem', marginLeft: '3rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#071A4A', lineHeight: 1.1, marginTop: '1rem' }}>
              THE PEOPLE<br/>WHO MAKE IT HAPPEN.
            </h2>
          </div>
          
          <div className="col-span-12" style={{ marginLeft: '3rem' }}>
            {departments.map((dept) => (
              <div key={dept.id} className="dept-row" style={{ paddingBottom: '6rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div className="dept-num" style={{ fontSize: '8rem', fontWeight: 800, color: '#071A4A', opacity: 0.05, position: 'absolute', top: '-4rem', left: '-2rem', zIndex: 0, userSelect: 'none' }}>
                    {dept.id}
                  </div>
                  <h3 className="dept-title" style={{ fontSize: '2rem', fontWeight: 800, color: '#071A4A', margin: 0, position: 'relative', zIndex: 1 }}>
                    {dept.name}
                  </h3>
                  <p className="dept-desc" style={{ fontSize: '1.1rem', color: '#718096', margin: '0.5rem 0 0 0', position: 'relative', zIndex: 1, maxWidth: '600px', fontWeight: 500 }}>
                    {dept.description}
                  </p>
                </div>
                
                <div className="dept-divider" style={{ width: '100%', height: '1px', background: '#EAF1FF', marginTop: '1.5rem', marginBottom: '1.5rem' }}></div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {renderDepartmentLayout(dept)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. TEAM VALUES */}
      <section className="values-section" style={{ padding: '8rem 4rem', backgroundColor: '#F7F9FC', textAlign: 'center' }}>
        <h2 className="val-title" style={{ fontSize: '3rem', fontWeight: 800, color: '#071A4A', lineHeight: 1.2, marginBottom: '4rem' }}>
          DIFFERENT ROLES.<br/><span style={{ color: '#1649C7' }}>ONE DIRECTION.</span>
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {['TECHNICAL', 'RESEARCH', 'EVENTS', 'CREATIVES', 'OUTREACH', 'PUBLICITY'].map((word) => (
            <div key={word} className="val-word" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#24B8A8', padding: '1rem 2rem', border: '1px solid #EAF1FF', background: '#FFFFFF', borderRadius: '4px' }}>
              {word}
            </div>
          ))}
        </div>
      </section>





    </div>
  );
}
