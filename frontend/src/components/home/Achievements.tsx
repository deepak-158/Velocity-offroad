import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import dataService, { Achievement } from '../../services/dataService';

// Mock data - would come from API in a real implementation
// const achievements = [
//   {
//     id: 1,
//     title: 'National Championship',
//     description: 'First place in the National College Racing Championship',
//     year: '2023',
//     image: '/images/achievements/trophy1.svg',
//     link: '/about#achievements',
//   },
//   {
//     id: 2,
//     title: 'Engineering Excellence Award',
//     description: 'Recognized for innovative suspension design',
//     year: '2022',
//     image: '/images/achievements/trophy2.svg',
//     link: '/about#achievements',
//   },
//   {
//     id: 3,
//     title: 'Speed Record',
//     description: 'Set new college racing speed record at 142 mph',
//     year: '2021',
//     image: '/images/achievements/trophy3.svg',
//     link: '/about#achievements',
//   },
// ];

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  useEffect(() => {
    // Get the top 3 recent achievements
    const fetchAchievements = async () => {
      try {
        const recentAchievements = await dataService.getRecentAchievements(3);
        setAchievements(recentAchievements);
      } catch (error) {
        console.error('Error loading recent achievements:', error);
      }
    };
    
    fetchAchievements();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <SectionTitle 
          title="Our Achievements" 
          subtitle="Celebrating our team's dedication and success in competitive racing"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map(achievement => (
            <Card
              key={achievement.id}
              title={achievement.title}
              description={`${new Date(achievement.date).getFullYear()} - ${achievement.description}`}
              image={achievement.imageUrl}
              // link={achievement.link}
              // linkText="View Details"
              className="achievement-card"
            />
          ))}        </div>
        
        <div className="text-center mt-12">
          <Link to="/about#achievements" className="btn btn-secondary">
            See All Achievements
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 