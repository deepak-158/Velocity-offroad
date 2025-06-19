import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import dataService, { TeamInfo } from '../services/dataService';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  imageUrl: string;
  additionalAwards?: string[];
}

const AboutPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch achievements data
        const fetchedAchievements = await dataService.getAllAchievements();
        setAchievements(fetchedAchievements);
        
        // Fetch team info data
        const info = await dataService.getTeamInfo();
        setTeamInfo(info);
      } catch (error) {
        console.error('Error loading about page data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <Layout>
      <Hero
        title="About Our Racing Club"
        subtitle="Learn about our journey, mission, and the passion that drives us forward"
        backgroundImage="/images/hero/about-hero.svg"
        buttonText="Join Our Team"
        buttonLink="/contact"
      />
      
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{
                fontSize: '1.875rem',
                fontFamily: "'Racing Sans One', cursive",                color: 'var(--color-primary-600)',
                marginBottom: '1rem'
              }}>
                {teamInfo?.mission.title || 'Our Mission'}
              </h2>
              <p style={{
                color: '#374151',
                marginBottom: '1.5rem'
              }}>
                {teamInfo?.mission.statement || 'At Racing Club, our mission is to design, build, and race high-performance vehicles while developing the next generation of engineering talent. We believe in hands-on learning, innovation, and the thrill of competition.'}
              </p>
            </div>
            <div style={{ 
              borderRadius: '0.5rem', 
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
              <img 
                src="/images/logo/goal.png" 
                alt="Team discussion" 
                style={{ width: '100%', height: 'auto' }}
              />            </div>
          </div>
        </div>
      </section>

      

      {/* Achievements Section */}
      <section id="achievements" className="section" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container-custom">
          <h2 style={{
            fontSize: '1.875rem',
            fontFamily: "'Racing Sans One', cursive",
            color: 'var(--color-primary-600)',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Our Achievements
          </h2>
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            A chronicle of our team's dedication, innovation, and success in competitive racing events.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.id} style={{
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={achievement.imageUrl} 
                    alt={achievement.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-primary-600)',
                      fontWeight: '500'
                    }}>
                      {new Date(achievement.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      backgroundColor: 'var(--color-primary-100)',
                      color: 'var(--color-primary-800)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      textTransform: 'capitalize'
                    }}>
                      {achievement.category}
                    </span>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#111827'
                  }}>
                    {achievement.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#4B5563',
                    marginBottom: '1rem'
                  }}>
                    {achievement.description}
                  </p>
                  
                  <p style={{ 
                    fontSize: '0.875rem',
                    color: '#6B7280',
                    marginBottom: '1rem'
                  }}>
                    <strong>Venue:</strong> {achievement.venue}
                  </p>
                  
                  {achievement.additionalAwards && achievement.additionalAwards.length > 0 && (
                    <div>
                      <p style={{ 
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Additional Awards:
                      </p>
                      <ul style={{ 
                        listStyleType: 'disc',
                        paddingLeft: '1.5rem',
                        fontSize: '0.875rem',
                        color: '#4B5563',
                        marginBottom: '0.5rem'
                      }}>
                        {achievement.additionalAwards.map((award, index) => (
                          <li key={index}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <h2 style={{
            fontSize: '1.875rem',
            fontFamily: "'Racing Sans One', cursive",
            color: 'var(--color-primary-600)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamInfo && teamInfo.mission.values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                    {index === 0 && (
                      <>
                        <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 1113.5 0v4.661c0 .326.277.585.6.544.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                        <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd" />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <path d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" />
                        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                      </>
                    )}
                    {index === 2 && (
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    )}
                    {index === 3 && (
                      <>
                        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                        <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                        <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                      </>
                    )}
                  </svg>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
            {!teamInfo && (
              <>
                <div className="value-card">
                  <div className="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 1113.5 0v4.661c0 .326.277.585.6.544.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                      <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3>Innovation</h3>
                  <p>We constantly seek new ideas and solutions, embracing cutting-edge technologies and methodologies to advance our designs and performance.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                      <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                  </div>
                  <h3>Teamwork</h3>
                  <p>We believe in the power of collaboration, bringing together diverse skills and perspectives to achieve common goals and overcome challenges.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3>Excellence</h3>
                  <p>We strive for excellence in everything we do, from design and engineering to team management and competition performance.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

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
            Join Our Racing Family
          </h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            We're always looking for passionate individuals to join our team. Whether you're interested in engineering, marketing, management, or just love racing, there's a place for you.
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
            >              Meet Our Team
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;