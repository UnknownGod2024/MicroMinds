import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine theme based on route
  const isLightTheme = path === '/team' || path === '/vision';

  // Navigation Links
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Vision', path: '/vision' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' }
  ];

  if (isLightTheme) {
    return (
      <nav className="vision-navbar team-navbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '1.5rem 4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(7, 26, 74, 0.05)' }}>
        <div style={{ position: 'absolute', left: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo_2.png" alt="MicroMinds" style={{ height: '48px', filter: 'invert(1)' }} />
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: '#071A4A' }}>
            DJS MICROMINDS<br/><span style={{ color: '#1649C7', fontWeight: 400 }}>VLSI CLUB</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {links.map((link) => {
            const isActive = path === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`nav-link ${isActive ? 'nav-active' : ''}`} 
                style={{ 
                  color: isActive ? '#24B8A8' : '#071A4A', 
                  fontWeight: isActive ? 600 : 500, 
                  fontSize: '0.85rem', 
                  position: 'relative' 
                }}
              >
                {link.name}
                {isActive && (
                  <span style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '2px', background: '#24B8A8' }}></span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  // Dark Theme
  return (
    <nav className="navbar" id="navbar">
      <div className="logo title-font" style={{ position: 'absolute', left: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src="/logo_2.png" alt="MicroMinds Logo" style={{ height: '64px' }} />
        <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', lineHeight: 1.2, color: '#F8FAFC' }}>
          DJS MICROMINDS<br/><span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>VLSI CLUB</span>
        </div>
      </div>
      <div className="nav-links">
        {links.map((link) => {
          const isActive = path === link.path;
          return (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${isActive ? 'nav-active' : ''}`}
              style={{ position: 'relative' }}
            >
              {link.name}
              {isActive && (
                <span style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '2px', background: 'var(--color-teal)' }}></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
