import React, { useRef, useState, useEffect } from 'react';
import Card from './Card';
import './FeaturedCards.css';
import dataService, { RacingJourney } from '../../services/dataService';

interface FeaturedCardsProps {
  className?: string;
}

const FeaturedCards: React.FC<FeaturedCardsProps> = ({ className = '' }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [journeyItems, setJourneyItems] = useState<RacingJourney[]>([]);
  useEffect(() => {
    // Fetch racing journey items from data service
    const fetchData = async () => {
      try {
        const items = await dataService.getAllRacingJourneyItems();
        setJourneyItems(items);
      } catch (error) {
        console.error('Error loading racing journey items:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <section className={`section ${className}`}>
      <div className="container-custom">
        <div className="section-header mb-8">
          <h2 className="section-title">Our Racing Journey</h2>
        </div>
        
        <div className="scrollable-cards-container">
          <div 
            className="scrollable-cards"
            ref={scrollContainerRef}
          >
            {journeyItems.map((item) => (
              <div 
                key={item.id}
                className="scrollable-card-item"
                style={{ animationDelay: `${0.1 * item.id}s` }}
              >
                <Card
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  // link={item.link}
                  // linkText="View Details"
                />
              </div>
            ))}
          </div>
          
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
            <div className="scroll-text">Scroll to see more</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCards;