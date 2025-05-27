import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Updated data with our new SVG images
const carouselImages = [
  {
    id: 1,
    src: '/images/gallery/racing-team.svg',
    alt: 'Racing team with vehicle',
    caption: 'Our team with our latest racing car at the National Championship',
  },
  {
    id: 2,
    src: '/images/gallery/car-track.svg',
    alt: 'Car on racetrack',
    caption: 'Testing day at the local circuit - pushing our car to the limits',
  },
  {
    id: 3,
    src: '/images/gallery/engine-workshop.svg',
    alt: 'Engine workshop',
    caption: 'Our engineering team fine-tuning the engine for maximum performance',
  },
  {
    id: 4,
    src: '/images/gallery/team-celebration.svg',
    alt: 'Team celebration',
    caption: 'Celebrating our podium finish at the Regional Finals',
  },
];

const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  return (
    <section className="py-16 bg-gray-900">
      <div className="container-custom">
        <div className="relative h-96 rounded-lg overflow-hidden group">
          {/* Images */}
          {carouselImages.map((image, index) => (
            <div 
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-6">
                <p className="text-white text-lg">{image.caption}</p>
              </div>
            </div>
          ))}
          
          {/* Navigation arrows */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {carouselImages.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel; 