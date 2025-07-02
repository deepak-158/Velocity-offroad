import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import dataService, { Event } from '../../services/dataService';

const FeaturedEvents: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUpcomingEvents = async () => {
      try {
        setLoading(true);
        const events = await dataService.getUpcomingEvents();
        // Limit to first 3 events for featured section
        setUpcomingEvents(events.slice(0, 3));
      } catch (err) {
        console.error('Error loading upcoming events:', err);
        setError('Failed to load upcoming events');
      } finally {
        setLoading(false);
      }
    };

    loadUpcomingEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Upcoming Events" 
            subtitle="Join us for these exciting events and be part of our racing community"
          />
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-2 text-gray-600">Loading upcoming events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Upcoming Events" 
            subtitle="Join us for these exciting events and be part of our racing community"
          />
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <SectionTitle 
          title="Upcoming Events" 
          subtitle="Join us for these exciting events and be part of our racing community"
        />
        
        {upcomingEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <Card
                  key={event.id}
                  title={event.title}
                  description={`${formatDate(event.date)} at ${event.location} - ${event.description}`}
                  image={event.imageUrl}
                  link={`/events`}
                  linkText="Event Details"
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/events" className="btn btn-primary">
                View All Events
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No upcoming events at the moment.</p>
            <p className="text-gray-500">Check back soon for exciting racing events and workshops!</p>
            <div className="mt-6">
              <Link to="/events" className="btn btn-primary">
                View Past Events
              </Link>
            </div>          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;