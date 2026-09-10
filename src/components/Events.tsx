import { useState } from 'react';
import { Link } from 'react-router-dom';
import { events } from '../data/events';
import type { EventData } from '../data/events';
import { EventModal } from './EventModal';

export const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  // Separate past and upcoming events if needed, or just show past for now
  const pastEvents = events.filter(e => e.status === 'past');

  return (
    <div style={{ padding: '8rem 2rem', color: '#F8FAFC', background: '#040D14', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>THE SILICON LOG</h1>
          <Link to="/" className="btn" style={{ borderColor: 'rgba(255,255,255,0.2)', marginBottom: '0.5rem' }}>&larr; BACK TO HOME</Link>
        </div>
        
        <div className="event-grid">
          {pastEvents.map(event => (
            <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
              <div className="event-card-image-wrapper">
                <img src={event.coverImage} alt={event.title} className="event-card-image" />
                <div className="event-badge">PAST EVENT</div>
              </div>
              <div className="event-card-content">
                <div className="event-card-date">{event.date}</div>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-subtitle">{event.subtitle}</p>
                <div className="event-card-action">VIEW DETAILS &rarr;</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};
