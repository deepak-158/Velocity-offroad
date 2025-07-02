import React, { useState, useEffect } from 'react';
import dataService, { Member } from '../services/dataService';

const MembersList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const allMembers = await dataService.getAllMembers();
        setMembers(allMembers);
      } catch (error) {
        console.error('Error loading members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="members-list">
      <h2>Team Members</h2>
      <div className="members-grid">
        {members.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

// Member card component
const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <div className="member-card">
      <img src={member.image_url} alt={`${member.name}`} className="member-image" />
      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
      <p className="member-bio">{member.bio}</p>
      <div className="social-links">
        {member.social_links.linkedin && (
          <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        )}
        {member.social_links.twitter && (
          <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        )}
        {member.social_links.github && (
          <a href={member.social_links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default MembersList; 