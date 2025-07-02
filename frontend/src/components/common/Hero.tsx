import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonType?: 'primary' | 'secondary' | 'outline';
  buttonSize?: 'sm' | 'lg';
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage = '/images/hero/hero-background.svg',
  buttonText,
  buttonLink,
  buttonType = 'primary',
  buttonSize = 'lg',
}) => {
  // Handle scroll to anchor if the link is a hash link
  const handleClick = (e: React.MouseEvent) => {
    if (buttonLink && buttonLink.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(buttonLink.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="hero">
      <div 
        className="hero-background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="hero-overlay"></div>
      
      <div className="container-custom">
        <div className="hero-content">
          <h1 className="hero-title animate-slide-in-left">
            {title}
          </h1>
          <p className="hero-subtitle animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>
          
          {buttonText && buttonLink && (
            <div className="animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              {buttonLink.startsWith('#') ? (
                <a 
                  href={buttonLink} 
                  className={`btn btn-${buttonType} ${buttonSize ? `btn-${buttonSize}` : ''}`}
                  onClick={handleClick}
                >
                  {buttonText}
                </a>
              ) : (
                <Link 
                  to={buttonLink} 
                  className={`btn btn-${buttonType} ${buttonSize ? `btn-${buttonSize}` : ''}`}
                >
                  {buttonText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero; 