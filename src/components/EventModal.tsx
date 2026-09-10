import React, { useState, useEffect } from 'react';
import type { EventData } from '../data/events';

interface EventModalProps {
  event: EventData;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const images = event.galleryImages || [event.coverImage];
  const numImages = images.length;

  useEffect(() => {
    // Lock body scrolling
    document.body.style.overflow = 'hidden';
    
    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % numImages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + numImages) % numImages);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 50) {
      nextSlide();
      setTouchStart(null);
    } else if (diff < -50) {
      prevSlide();
      setTouchStart(null);
    }
  };

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="event-modal-close" onClick={onClose}>&times;</button>
        
        <div className="event-modal-grid">
          {/* Carousel Section */}
          <div className="event-carousel-section">
            <div 
              className="event-carousel-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <div 
                className="event-carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((img, idx) => (
                  <div key={idx} className="event-carousel-slide">
                    <img src={img} alt={`${event.title} gallery ${idx + 1}`} />
                  </div>
                ))}
              </div>
              
              {numImages > 1 && (
                <>
                  <button className="carousel-control prev" onClick={prevSlide}>&#10094;</button>
                  <button className="carousel-control next" onClick={nextSlide}>&#10095;</button>
                  <div className="carousel-indicators">
                    <span className="carousel-counter">
                      {String(currentSlide + 1).padStart(2, '0')} / {String(numImages).padStart(2, '0')}
                    </span>
                    <div className="carousel-dots">
                      {images.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                          onClick={() => setCurrentSlide(idx)}
                        ></span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="event-details-section">
            <div className="event-modal-header">
              <span className="event-modal-date">{event.date}</span>
              <h2 className="event-modal-title">{event.title}</h2>
              <h3 className="event-modal-subtitle">{event.subtitle}</h3>
            </div>
            
            <div className="event-modal-body">
              {event.speaker && (
                <div className="event-meta-item">
                  <strong>Speaker:</strong> {event.speaker}
                </div>
              )}
              {event.venue && (
                <div className="event-meta-item">
                  <strong>Venue:</strong> {event.venue}
                </div>
              )}
              
              <div className="event-description">
                {event.description}
              </div>

              {event.learnings && event.learnings.length > 0 && (
                <div className="event-list-section">
                  <h4>What Participants Learned</h4>
                  <ul>
                    {event.learnings.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {event.highlights && event.highlights.length > 0 && (
                <div className="event-list-section">
                  <h4>Workshop Highlights</h4>
                  <ul>
                    {event.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
