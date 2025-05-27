import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import dataService, { Member } from '../services/dataService';

// Interface for extending Member with specialty information
interface TeamMember extends Member {
  specialty?: string;
}

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch members from dataService
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        // Get all members from the data service
        const members = await dataService.getAllMembers();
        
        // Transform the data to match the TeamMember interface
        const transformedMembers: TeamMember[] = members.map(member => ({
          ...member,
          specialty: member.role.includes('Engineer') ? 'Engineering' : 
                    member.role.includes('Tech') ? 'Technology' : 
                    member.role.includes('Captain') ? 'Leadership' : 'Other'
        }));
        
        setTeamMembers(transformedMembers);
        setError(null);
      } catch (err) {
        console.error('Error loading team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  // Filter members by category
  const filteredMembers = activeCategory === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => {
        // Match role or specialty with category
        return member.role.toLowerCase().includes(activeCategory.toLowerCase()) || 
               (member.specialty && member.specialty.toLowerCase().includes(activeCategory.toLowerCase()));
      });
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Members' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'business', name: 'Business' }
  ];

  return (
    <Layout>
      <Hero
        title="Meet Our Team"
        subtitle="The dedicated individuals who power our racing success"
        backgroundImage="/images/hero/team-hero.svg"
        buttonText="Join Us"
        buttonLink="/contact"
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
            Our Racing Team
          </h2>
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Meet the passionate engineers, designers, and business specialists who make our racing dreams a reality.
          </p>

          {/* Category filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  backgroundColor: activeCategory === category.id ? 'var(--color-primary-600)' : 'white',
                  color: activeCategory === category.id ? 'white' : '#4b5563',
                  fontWeight: activeCategory === category.id ? '600' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {loading && <p style={{ textAlign: 'center' }}>Loading team members...</p>}
          {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

          {/* Team members grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ marginTop: '1rem' }}>
            {filteredMembers.map(member => (
              <div key={member.id} style={{
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                backgroundColor: 'white'
              }}>
                <div style={{ 
                  height: '15rem',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#f3f4f6'
                }}>
                  <img 
                    src={member.image_url} 
                    alt={member.name} 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '0.25rem',
                    color: '#111827'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{ 
                    color: 'var(--color-primary-600)',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    {member.role}
                  </p>
                  {member.specialty && (
                    <p style={{ 
                      color: '#4b5563',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem'
                    }}>
                      <strong>Specialty:</strong> {member.specialty}
                    </p>
                  )}
                  <p style={{ 
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: '1rem'
                  }}>
                    {member.bio}
                  </p>
                  
                  {/* Social links */}
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem'
                  }}>
                    {member.social_links.linkedin && (
                      <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn profile`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#0077b5' }}>
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    )}
                    {member.social_links.github && (
                      <a href={member.social_links.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s GitHub profile`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#333' }}>
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                        </svg>
                      </a>
                    )}
                    {member.social_links.twitter && (
                      <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s Twitter profile`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#1DA1F2' }}>
                          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && !loading && (
            <p style={{ textAlign: 'center', marginTop: '2rem', color: '#6B7280' }}>
              No team members found in this category.
            </p>
          )}
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontFamily: "'Racing Sans One', cursive",
            color: 'var(--color-primary-600)',
            marginBottom: '1rem'
          }}>
            Join Our Team
          </h2>
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            We're always looking for passionate individuals to join our racing family. No prior experience necessary � just enthusiasm and a willingness to learn!
          </p>
          <a 
            href="/contact" 
            className="btn btn-primary"
            style={{ 
              display: 'inline-block'
            }}
          >
            Apply Now
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
