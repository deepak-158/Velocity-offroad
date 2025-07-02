import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import dataService, { Sponsor } from '../services/dataService';


// Sponsorship tier information
const TIER_INFO = {
  platinum: {
    name: 'Platinum',
    color: '#E5E4E2',
    benefits: [
      'Large logo on all vehicles',
      'Premium placement on team apparel',
      'Dedicated section on website',
      'Social media promotion package',
      'VIP access to all racing events',
      'Team building day with your company',
      'Exclusive technical workshops'
    ]
  },
  gold: {
    name: 'Gold',
    color: '#FFD700',
    benefits: [
      'Medium logo on all vehicles',
      'Logo on team apparel',
      'Featured on website',
      'Regular social media mentions',
      'VIP access to major racing events',
      'Technical demonstration day'
    ]
  },
  silver: {
    name: 'Silver',
    color: '#C0C0C0',
    benefits: [
      'Small logo on all vehicles',
      'Logo on team apparel',
      'Listed on website',
      'Social media mentions',
      'Invitations to racing events'
    ]
  },
  bronze: {
    name: 'Bronze',
    color: '#CD7F32',
    benefits: [
      'Small logo on selected vehicles',
      'Listed on website',
      'Occasional social media mentions',
      'Invitations to major racing events'
    ]
  },
  partner: {
    name: 'Partner',
    color: '#3B82F6',
    benefits: [
      'Listed on website',
      'Acknowledgment at events',
      'Invitation to annual sponsor appreciation day'
    ]
  }
};

const SponsorsPage: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [activeTier, setActiveTier] = useState<string>('all');

  // This will be used when backend is connected
  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const fetchedSponsors = await dataService.getAllSponsors();
        setSponsors(fetchedSponsors);
      } catch (err) {
        console.error('Error fetching sponsors:', err);
      }
    };
    
    loadSponsors();
  }, []);
  // Filter sponsors by tier
  const filteredSponsors = activeTier === 'all' 
    ? sponsors 
    : sponsors.filter(sponsor => sponsor.tier === activeTier);

  // Order of tiers for display
  const tierOrder = ['platinum', 'gold', 'silver', 'bronze', 'partner'];

  return (
    <Layout>
      <Hero
        title="Our Sponsors"
        subtitle="The partners who make our racing dreams possible"
        backgroundImage="/images/hero/sponsors-hero.svg"
        buttonText="Become a Sponsor"
        buttonLink="#sponsorship-opportunities"
      />
      
      <section className="section">
        <div className="container-custom">
          <h2 style={{
            fontSize: '1.875rem',
            fontFamily: "'Racing Sans One', cursive",
            color: 'var(--color-primary-600)',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Our Valued Sponsors
          </h2>
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            We are grateful for the support of these organizations that help power our racing program and make our achievements possible.
          </p>

          {/* Tier filters */}          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setActiveTier('all')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                backgroundColor: activeTier === 'all' ? 'var(--color-primary-600)' : 'white',
                color: activeTier === 'all' ? 'white' : '#4b5563',
                fontWeight: activeTier === 'all' ? '600' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              All Sponsors
            </button>
            {Object.entries(TIER_INFO).map(([tier, info]) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  backgroundColor: activeTier === tier ? 'var(--color-primary-600)' : 'white',
                  color: activeTier === tier ? 'white' : '#4b5563',
                  fontWeight: activeTier === tier ? '600' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {info.name}
              </button>
            ))}
          </div>

          {/* Sponsors by tier */}
          {activeTier === 'all' ? (
            // Display all tiers in order
            tierOrder.map(tier => {
              const tiersSponsors = sponsors.filter(sponsor => sponsor.tier === tier);
              if (tiersSponsors.length === 0) return null;
              
              return (
                <div key={tier} style={{ marginBottom: '3rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontFamily: "'Racing Sans One', cursive",
                    color: TIER_INFO[tier as keyof typeof TIER_INFO].color,
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    {TIER_INFO[tier as keyof typeof TIER_INFO].name} Sponsors
                  </h3>
                  
                  <div className={`grid grid-cols-1 ${tier === 'platinum' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                    {tiersSponsors.map(sponsor => (
                      <div key={sponsor.id} style={{
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}>
                        <div style={{ 
                          height: tier === 'platinum' ? '8rem' : '7rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem'
                        }}>
                          <img 
                            src={sponsor.logo} 
                            alt={`${sponsor.name} logo`} 
                            style={{ 
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                        
                        <h4 style={{ 
                          fontSize: tier === 'platinum' ? '1.25rem' : '1.125rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#111827'
                        }}>
                          {sponsor.name}
                        </h4>
                        
                        {sponsor.description && (
                          <p style={{ 
                            color: '#4B5563',
                            fontSize: '0.875rem',
                            marginBottom: '1rem',
                            flex: '1'
                          }}>
                            {sponsor.description}
                          </p>
                        )}
                        
                        {sponsor.since && (
                          <p style={{ 
                            color: '#6B7280',
                            fontSize: '0.75rem',
                            marginBottom: '1rem'
                          }}>
                            Sponsor since {sponsor.since}
                          </p>
                        )}
                        
                        <a 
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                          style={{ 
                            fontSize: '0.875rem',
                            padding: '0.375rem 0.75rem',
                            backgroundColor: 'white',
                            color: 'var(--color-primary-600)',
                            border: '1px solid var(--color-primary-600)'
                          }}
                        >
                          Visit Website
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Display only the selected tier
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontFamily: "'Racing Sans One', cursive",
                color: TIER_INFO[activeTier as keyof typeof TIER_INFO].color,
                marginBottom: '1.5rem',
                textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
                {TIER_INFO[activeTier as keyof typeof TIER_INFO].name} Sponsors
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredSponsors.map(sponsor => (
                  <div key={sponsor.id} style={{
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      height: '7rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <img 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`} 
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    
                    <h4 style={{ 
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#111827'
                    }}>
                      {sponsor.name}
                    </h4>
                    
                    {sponsor.description && (
                      <p style={{ 
                        color: '#4B5563',
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        flex: '1'
                      }}>
                        {sponsor.description}
                      </p>
                    )}
                    
                    {sponsor.since && (
                      <p style={{ 
                        color: '#6B7280',
                        fontSize: '0.75rem',
                        marginBottom: '1rem'
                      }}>
                        Sponsor since {sponsor.since}
                      </p>
                    )}
                    
                    <a 
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ 
                        fontSize: '0.875rem',
                        padding: '0.375rem 0.75rem',
                        backgroundColor: 'white',
                        color: 'var(--color-primary-600)',
                        border: '1px solid var(--color-primary-600)'
                      }}
                    >
                      Visit Website
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {filteredSponsors.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '2rem', color: '#6B7280' }}>
              No sponsors found in this category.
            </p>
          )}
        </div>
      </section>

      {/* Sponsorship Opportunities Section */}
      <section id="sponsorship-opportunities" className="section" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container-custom">
          <h2 style={{
            fontSize: '1.875rem',
            fontFamily: "'Racing Sans One', cursive",
            color: 'var(--color-primary-600)',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Sponsorship Opportunities
          </h2>
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Join our team of sponsors and support the next generation of engineering talent while gaining visibility for your brand.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tierOrder.slice(0, 4).map(tier => (
              <div key={tier} style={{
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ 
                  backgroundColor: TIER_INFO[tier as keyof typeof TIER_INFO].color,
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: tier === 'gold' ? '#111827' : 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    {TIER_INFO[tier as keyof typeof TIER_INFO].name}
                  </h3>
                </div>
                
                <div style={{ padding: '1.5rem', flex: '1' }}>
                  <ul style={{ 
                    marginBottom: '1.5rem',
                    listStyleType: 'none',
                    padding: 0
                  }}>
                    {TIER_INFO[tier as keyof typeof TIER_INFO].benefits.map((benefit, index) => (
                      <li key={index} style={{ 
                        padding: '0.5rem 0',
                        borderBottom: '1px solid #E5E7EB',
                        color: '#4B5563',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-primary-600)' }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="/contact" 
                    className="btn btn-primary"
                    style={{ 
                      display: 'block',
                      textAlign: 'center'
                    }}
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {tierOrder.slice(4).map(tier => (
              <div key={tier} style={{
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ 
                  backgroundColor: TIER_INFO[tier as keyof typeof TIER_INFO].color,
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{ 
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    {TIER_INFO[tier as keyof typeof TIER_INFO].name}
                  </h3>
                </div>
                
                <div style={{ padding: '1.5rem', flex: '1' }}>
                  <ul style={{ 
                    marginBottom: '1.5rem',
                    listStyleType: 'none',
                    padding: 0
                  }}>
                    {TIER_INFO[tier as keyof typeof TIER_INFO].benefits.map((benefit, index) => (
                      <li key={index} style={{ 
                        padding: '0.5rem 0',
                        borderBottom: '1px solid #E5E7EB',
                        color: '#4B5563',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-primary-600)' }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="/contact" 
                    className="btn"
                    style={{ 
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: 'white',
                      color: 'var(--color-primary-600)',
                      border: '1px solid var(--color-primary-600)'
                    }}
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '3rem',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#111827'
            }}>
              Custom Sponsorship Packages
            </h3>
            <p style={{ 
              color: '#4B5563',
              marginBottom: '1.5rem',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              We understand that every organization has unique goals and needs. Contact us to discuss custom sponsorship packages tailored to your specific objectives.
            </p>
            <a 
              href="/contact" 
              className="btn btn-primary"
              style={{ 
                display: 'inline-block'
              }}
            >
              Contact for Custom Package
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SponsorsPage;