import { Link } from 'react-router-dom';

export const Events = () => {
  return (
    <div style={{ padding: '8rem 2rem', color: '#F8FAFC', background: '#040D14', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 800 }}>Events</h1>
      <p style={{ marginTop: '2rem', fontSize: '1.25rem', color: '#94A3B8' }}>Coming Soon.</p>
      <Link to="/" style={{ marginTop: '4rem', color: '#24B8A8', textDecoration: 'none', fontWeight: 700 }}>&larr; BACK TO HOME</Link>
    </div>
  );
};
