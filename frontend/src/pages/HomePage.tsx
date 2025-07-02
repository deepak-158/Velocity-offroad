import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import FeaturedEvents from '../components/home/FeaturedEvents';
import Achievements from '../components/home/Achievements';
import FeaturedCards from '../components/common/FeaturedCards';
import dataService, { TeamInfo } from '../services/dataService';

const HomePage: React.FC = () => {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  
  useEffect(() => {
    const loadTeamInfo = async () => {
      try {
        const info = await dataService.getTeamInfo();
        setTeamInfo(info);
      } catch (error) {
        console.error('Error loading team info:', error);
      }
    };
    
    loadTeamInfo();
  }, []);

  return (
    <Layout>
      <Hero
        title="Speed. Engineering. Excellence."
        subtitle="We are a dedicated team of student engineers passionate about designing, building, and racing high-performance vehicles."
        backgroundImage="/images/hero/hero-background.svg"
        buttonText="Join Our Team"
        buttonLink="/contact"
      />
      
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{
                fontSize: '1.875rem',
                fontFamily: "'Racing Sans One', cursive",
                color: 'var(--color-primary-600)',
                marginBottom: '1rem'
              }}>
                {teamInfo?.welcome.title || 'Welcome to VELOCITY OFFROAD'}
              </h2>
              {teamInfo?.welcome.description.map((paragraph, index) => (
                <p key={index} style={{
                  color: '#374151',
                  marginBottom: index === teamInfo.welcome.description.length - 1 ? '1.5rem' : '1rem'
                }}>
                  {paragraph}
                </p>
              ))}
              <a href={teamInfo?.welcome.buttonLink || "/about"} className="btn btn-primary">
                {teamInfo?.welcome.buttonText || "About Our Club"}
              </a>
            </div>
            <div style={{ 
              borderRadius: '0.5rem', 
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
              <img 
                src={teamInfo?.welcome.logoImage || "/images/logo/logo.png"} 
                alt="VELOCITY OFFROAD Logo" 
                style={{ width: '100%', height: 'auto', backgroundColor: '#000000', padding: '2rem' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      <div className="py-12">
        <Achievements />
      </div>
      
      <div className="pb-12">
        <FeaturedCards />
      </div>
      
      <FeaturedEvents />
      
      <section className="section" style={{ 
        backgroundColor: 'var(--color-primary-600)',
        color: 'white'
      }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontFamily: "'Racing Sans One', cursive",
            marginBottom: '1.5rem'
          }}>
            Ready to Join the Race?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Whether you're passionate about engineering, racing, or just looking for an exciting
            team to be part of, we have a place for you.
          </p>
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <a 
              href="/contact" 
              className="btn"
              style={{ 
                backgroundColor: 'white',
                color: 'var(--color-primary-600)'
              }}
            >
              Contact Us
            </a>
            <a 
              href="/team" 
              className="btn"
              style={{ 
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'white',
                backgroundColor: 'transparent'
              }}
            >
              Meet Our Team
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;