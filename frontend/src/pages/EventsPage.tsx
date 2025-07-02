import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import Breadcrumbs from '../components/common/Breadcrumbs';
import SocialShareButtons from '../components/common/SocialShareButtons';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useLoading } from '../context/LoadingContext';
import dataService, { Event } from '../services/dataService';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filterUpcoming, setFilterUpcoming] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { startLoading, stopLoading } = useLoading();

  // Fetch events from dataService
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        startLoading();
        
        // Get all events from data service
        const allEvents = await dataService.getAllEvents();
        setEvents(allEvents);
        setError(null);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
        stopLoading();
      }
    };
    
    fetchEvents();
  }, [startLoading, stopLoading]);

  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === "all" || event.category.toLowerCase() === activeCategory.toLowerCase();
    
    if (filterUpcoming === true) {
      return matchesCategory && event.isUpcoming;
    } else if (filterUpcoming === false) {
      return matchesCategory && !event.isUpcoming;
    }
    
    return matchesCategory;
  });

  // Sort events: upcoming first, then by date (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    // First sort by upcoming status
    if (a.isUpcoming && !b.isUpcoming) return -1;
    if (!a.isUpcoming && b.isUpcoming) return 1;
    
    // Then sort by date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(events.map(event => event.category)))];

  return (
    <Layout>
      <Hero
        title="Racing Events"
        subtitle="Competitions, exhibitions, and community events"
        backgroundImage="/images/hero/events-hero.svg"
        buttonText="View Upcoming Events"
        buttonLink="#upcoming-events"
      />
      
      <div className="container-custom py-2">
        <Breadcrumbs />
      </div>
      
      <section className="section" id="upcoming-events">
        <div className="container-custom">
          <h2 style={{
            fontSize: "1.875rem",
            fontFamily: "'Racing Sans One', cursive",
            color: "var(--color-primary-600)",
            marginBottom: "0.5rem",
            textAlign: "center"
          }}>
            Racing Calendar
          </h2>
          <p style={{
            color: "#4b5563",
            marginBottom: "2rem",
            textAlign: "center",
            maxWidth: "48rem",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            Stay updated with our upcoming competitions, exhibitions, and community events.
          </p>

          {/* Filters */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "2rem" 
          }}>
            {/* Event type filters */}
            <div>
              <h3 style={{ 
                fontSize: "1rem", 
                fontWeight: "600", 
                marginBottom: "0.5rem",
                color: "#374151"
              }}>
                Filter by Category:
              </h3>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem"
              }}>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      border: "1px solid #d1d5db",
                      backgroundColor: activeCategory === category ? "var(--color-primary-600)" : "white",
                      color: activeCategory === category ? "white" : "#4b5563",
                      fontWeight: activeCategory === category ? "600" : "normal",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textTransform: category === "all" ? "capitalize" : "capitalize"
                    }}
                  >
                    {category === "all" ? "All Categories" : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe filters */}
            <div>
              <h3 style={{ 
                fontSize: "1rem", 
                fontWeight: "600", 
                marginBottom: "0.5rem",
                color: "#374151"
              }}>
                Timeframe:
              </h3>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem"
              }}>
                <button
                  onClick={() => setFilterUpcoming(null)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #d1d5db",
                    backgroundColor: filterUpcoming === null ? "var(--color-primary-600)" : "white",
                    color: filterUpcoming === null ? "white" : "#4b5563",
                    fontWeight: filterUpcoming === null ? "600" : "normal",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFilterUpcoming(true)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #d1d5db",
                    backgroundColor: filterUpcoming === true ? "var(--color-primary-600)" : "white",
                    color: filterUpcoming === true ? "white" : "#4b5563",
                    fontWeight: filterUpcoming === true ? "600" : "normal",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setFilterUpcoming(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #d1d5db",
                    backgroundColor: filterUpcoming === false ? "var(--color-primary-600)" : "white",
                    color: filterUpcoming === false ? "white" : "#4b5563",
                    fontWeight: filterUpcoming === false ? "600" : "normal",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  Past Events
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}>
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div style={{ 
              textAlign: "center", 
              padding: "2rem", 
              color: "#ef4444",
              backgroundColor: "#fee2e2",
              borderRadius: "0.5rem"
            }}>
              {error}
            </div>
          ) : null}

          {/* Events list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginTop: "1rem" }}>
            {sortedEvents.map(event => (
              <div key={event.id} style={{
                borderRadius: "0.5rem",
                overflow: "hidden",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ 
                  height: "15rem",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    style={{ 
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  {event.isUpcoming && (
                    <div style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      backgroundColor: "#10B981",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "600"
                    }}>
                      Upcoming
                    </div>
                  )}
                </div>

                <div style={{ padding: "1.5rem", flex: "1" }}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <span style={{
                      display: "inline-block",
                      backgroundColor: "#E5E7EB",
                      color: "#4B5563",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "500"
                    }}>
                      {event.category}
                    </span>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    color: "#111827"
                  }}>
                    {event.title}
                  </h3>
                  
                  <div style={{ 
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginBottom: "1rem"
                  }}>
                    <p style={{ 
                      color: "#4B5563",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm2 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
                      </svg>
                      {formatDate(event.date)}
                    </p>
                    <p style={{ 
                      color: "#4B5563",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                      </svg>
                      {event.location}
                    </p>
                  </div>
                  
                  <p style={{ 
                    color: "#4B5563",
                    marginBottom: "1rem"
                  }}>
                    {event.description}
                  </p>
                  
                  <div style={{ marginBottom: "1rem" }}>
                    <SocialShareButtons 
                      title={`${event.title} - VELOCITY OFFROAD Event`}
                      description={event.description}
                      hashtags={["VelocityOffroad", "Racing", event.category]}
                      compact={true}
                    />
                  </div>
                  
                  {event.isUpcoming && event.registrationLink && (
                    <div style={{ marginBottom: "1rem" }}>
                      <p style={{ 
                        color: "#4B5563",
                        fontSize: "0.875rem",
                        marginBottom: "0.5rem"
                      }}>
                        Registration deadline: {event.registrationDeadline ? formatDate(event.registrationDeadline) : "Open"}
                      </p>
                      <a 
                        href={event.registrationLink}
                        className="btn btn-primary"
                        style={{ 
                          display: "inline-block",
                          fontSize: "0.875rem",
                          padding: "0.5rem 1rem"
                        }}
                      >
                        Register Now
                      </a>
                    </div>
                  )}
                  
                  {!event.isUpcoming && event.results && (
                    <div style={{ marginTop: "auto" }}>
                      <h4 style={{ 
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "0.5rem"
                      }}>
                        Results:
                      </h4>
                      {event.results.map((result, index) => (
                        <div key={index} style={{
                          backgroundColor: "#F3F4F6",
                          padding: "0.75rem",
                          borderRadius: "0.375rem",
                          marginBottom: "0.5rem"
                        }}>
                          <p style={{ 
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#111827"
                          }}>
                            {result.position} - {result.team}
                          </p>
                          {result.achievements && result.achievements.length > 0 && (
                            <ul style={{ 
                              marginTop: "0.25rem",
                              paddingLeft: "1.25rem",
                              listStyleType: "disc"
                            }}>
                              {result.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} style={{ 
                                  fontSize: "0.75rem",
                                  color: "#4B5563"
                                }}>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {sortedEvents.length === 0 && !loading && (
            <p style={{ textAlign: "center", marginTop: "2rem", color: "#6B7280" }}>
              No events match your selected filters. Please try different criteria.
            </p>
          )}
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "#f3f4f6" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontFamily: "'Racing Sans One', cursive",
            color: "var(--color-primary-600)",
            marginBottom: "1rem"
          }}>
            Host an Event With Us
          </h2>
          <p style={{
            color: "#4b5563",
            marginBottom: "2rem",
            maxWidth: "48rem",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            If you're interested in hosting a racing event, exhibition, or sponsoring an existing event, we'd love to collaborate with you.
          </p>
          <div style={{ 
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem"
          }}>
            <a 
              href="/contact" 
              className="btn btn-primary"
              style={{ 
                display: "inline-block"
              }}
            >
              Contact Us
            </a>
            <a 
              href="/sponsors#sponsorship-opportunities" 
              className="btn"
              style={{ 
                display: "inline-block",
                backgroundColor: "white",
                color: "var(--color-primary-600)",
                border: "1px solid var(--color-primary-600)"
              }}
            >
              Sponsorship Opportunities
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;
