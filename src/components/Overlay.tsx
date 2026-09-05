export function Overlay() {
  return (
    <div className="ui-overlay">
      <div className="boot-text" id="boot-text">INITIALIZING MICROMINDS...</div>
      
      <nav className="navbar" id="navbar">
        <div className="logo title-font">
          <img src="/logo.jpg" alt="MicroMinds Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          <a className="nav-link">Home</a>
          <a className="nav-link">Vision</a>
          <a className="nav-link">Projects</a>
          <a className="nav-link">Events</a>
          <a className="nav-link">Team</a>
          <a className="nav-link">Connect</a>
        </div>
      </nav>

      <div className="hero-content" id="hero-content">
        <h1 className="hero-title title-font" id="hero-title">IDEAS INTO SILICON</h1>
        <p className="hero-subtitle" id="hero-subtitle">Learn. Design. Simulate. Innovate.</p>
      </div>
    </div>
  );
}
