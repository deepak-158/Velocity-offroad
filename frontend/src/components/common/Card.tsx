import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  link?: string;
  linkText?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  link,
  linkText = 'Learn More',
  className = '',
}) => {
  return (
    <div className={`card overflow-hidden ${className}`}>
      {image && (
        <div className="card-image h-48 overflow-hidden -mx-6 -mt-6 mb-6">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="card-content flex-grow">
        <h3 className="text-xl font-racing text-primary-600 mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 mb-4">
            {description}
          </p>
        )}
      </div>
      
      {link && (
        <div className="card-action mt-auto pt-2">
          <Link 
            to={link}
            className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center"
          >
            {linkText} 
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Card; 