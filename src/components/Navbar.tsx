import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isLightTheme = path === '/team' || path === '/vision';

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Vision', path: '/vision' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' }
  ];

  return (
    <>
      {/* ===== Navbar ===== */}
      <nav
        className={isLightTheme ? 'vision-navbar team-navbar' : 'navbar'}
        id="navbar"
        style={
          isLightTheme
            ? {
                position: 'fixed', top: 0, left: 0, right: 0,
                padding: '1.5rem 4rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 100,
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid rgba(7, 26, 74, 0.05)',
              }
            : undefined
        }
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 110, position: 'relative' }}>
          <img
            src="/logo_2.png"
            alt="MicroMinds Logo"
            style={{ height: isLightTheme ? '56px' : '86px', ...(isLightTheme ? { filter: 'invert(1)' } : {}) }}
          />
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', lineHeight: 1.2, color: isLightTheme ? '#071A4A' : '#F8FAFC' }}>
            DJS MICROMINDS<br />
            <span style={{ color: isLightTheme ? '#1649C7' : 'var(--color-muted)', fontWeight: 400 }}>VLSI CLUB</span>
          </div>
        </div>

        {/* Desktop nav links — hidden on mobile via CSS */}
        <div className="desktop-nav-links">
          {links.map((link) => {
            const isActive = path === link.path;
            return (
              <Link key={link.name} to={link.path}
                className={`nav-link ${isActive ? 'nav-active' : ''}`}
                style={isLightTheme
                  ? { color: isActive ? '#24B8A8' : '#071A4A', fontWeight: isActive ? 600 : 500, fontSize: '0.85rem', position: 'relative' }
                  : { position: 'relative' }}
              >
                {link.name}
                {isActive && <span style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '2px', background: isLightTheme ? '#24B8A8' : 'var(--color-teal)' }} />}
              </Link>
            );
          })}
        </div>

        {/* Hamburger button — shown on mobile via CSS */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{ display: 'none' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={isLightTheme ? '#071A4A' : '#F8FAFC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </nav>

      {/* ===== Mobile dropdown (OUTSIDE <nav> so backdrop-filter doesn't break fixed positioning) ===== */}
      <div className={`mobile-nav-dropdown ${isOpen ? 'mobile-nav-dropdown--open' : ''}`}>
        {links.map((link) => {
          const isActive = path === link.path;
          return (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)}
              className="mobile-nav-dropdown__link"
              style={{ color: isActive ? 'var(--color-teal)' : '#F8FAFC', fontWeight: isActive ? 700 : 500 }}
            >
              {link.name}
              {isActive && <span className="mobile-nav-dropdown__indicator" />}
            </Link>
          );
        })}
      </div>
    </>
  );
};
