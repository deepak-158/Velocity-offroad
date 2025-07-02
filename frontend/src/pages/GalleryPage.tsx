import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import Breadcrumbs from '../components/common/Breadcrumbs';
import OptimizedImage from '../components/common/OptimizedImage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import dataService, { GalleryItem } from '../services/dataService';

// GalleryItem interface is imported from dataService

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // Fetch images from data service
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch gallery items using data service
        const galleryItems = await dataService.getAllGalleryItems();
        setImages(galleryItems || []);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError('Failed to load gallery. Please try again later.');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, []); // Remove dependencies to prevent re-fetching

  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Filter images by category
  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(image => image.category === activeCategory);

  // Get unique categories for filter
  const categories = ['all', ...Array.from(new Set(images.map(image => image.category)))];
  // Handle opening the lightbox
  const openLightbox = (image: GalleryItem) => {
    setLightboxImage(image);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  // Handle closing the lightbox
  const closeLightbox = () => {
    setLightboxImage(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <Layout>
      <Hero
        title="Photo Gallery"
        subtitle="Capturing our racing journey through images"
        backgroundImage="/images/hero/gallery-hero.svg"
        buttonText="View Gallery"
        buttonLink="#gallery"
      />
      
      <div className="container-custom py-2">
        <Breadcrumbs />
      </div>
      
      <section className="section" id="gallery">
        <div className="container-custom">
          <h2 style={{
            fontSize: '1.875rem',
            fontFamily: "'Racing Sans One', cursive",
            color: 'var(--color-primary-600)',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Racing Gallery
          </h2>
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Browse through our collection of photos showcasing our team, vehicles, competitions, and events.
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
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  backgroundColor: activeCategory === category ? 'var(--color-primary-600)' : 'white',
                  color: activeCategory === category ? 'white' : '#4b5563',
                  fontWeight: activeCategory === category ? '600' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: category === 'all' ? 'capitalize' : 'capitalize'
                }}
              >
                {category === 'all' ? 'All Photos' : category}
              </button>
            ))}
          </div>          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              color: '#ef4444',
              backgroundColor: '#fee2e2',
              borderRadius: '0.5rem'
            }}>
              {error}
            </div>
          ) : (
            <>
              {/* Image grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ marginTop: '1rem' }}>
                {filteredImages.map(image => (
                  <div 
                    key={image.id} 
                    style={{
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => openLightbox(image)}
                  >
                    <div style={{ 
                      height: '15rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>                      <OptimizedImage 
                        src={image.url} 
                        alt={image.alt || image.title} 
                        height="100%"
                        objectFit="cover"
                        placeholder={image.thumbnail || undefined} 
                        lazyLoad={false} // Don't lazy load gallery images so they appear immediately
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        padding: '0.75rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white'
                      }}>
                        <h3 style={{ 
                          fontSize: '1rem',
                          fontWeight: '600',
                          marginBottom: '0.25rem'
                        }}>
                          {image.title}
                        </h3>
                        <p style={{ 
                          fontSize: '0.75rem',
                          opacity: '0.8'
                        }}>
                          {formatDate(image.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredImages.length === 0 && !loading && (
                <p style={{ textAlign: 'center', marginTop: '2rem', color: '#6B7280' }}>
                  No images found in this category.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '50',
          padding: '2rem'
        }}
        onClick={closeLightbox}
        >
          {/* Close button */}
          <button 
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer'
            }}
            onClick={closeLightbox}
            aria-label="Close"
          >
            &times;
          </button>
            {/* Image container */}
          <div 
            style={{
              maxWidth: '90%',
              maxHeight: '80%',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage 
              src={lightboxImage.url} 
              alt={lightboxImage.alt || lightboxImage.title} 
              width="100%"
              height="70vh"
              objectFit="contain"
              lazyLoad={false} // Don't lazy load the lightbox image
            />
          </div>
          
          {/* Image details */}
          <div 
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '1rem',
              borderRadius: '0.5rem',
              maxWidth: '90%',
              marginTop: '1rem',
              color: 'white',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              {lightboxImage.title}
            </h3>
            
            {lightboxImage.description && (
              <p style={{ 
                fontSize: '0.875rem',
                marginBottom: '0.5rem'
              }}>
                {lightboxImage.description}
              </p>
            )}
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              opacity: '0.8'
            }}>
              <p>{formatDate(lightboxImage.date)}</p>
              <p>Type: {lightboxImage.type}</p>
              <p>Category: {lightboxImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <section className="section" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontFamily: "'Racing Sans One', cursive",
            color: 'var(--color-primary-600)',
            marginBottom: '1rem'
          }}>
            Share Your Photos
          </h2>
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Are you a team member, supporter, or photographer who has captured moments from our races or events? We'd love to feature your photos in our gallery.
          </p>
          <a 
            href="/contact" 
            className="btn btn-primary"
            style={{ 
              display: 'inline-block'
            }}
          >
            Submit Your Photos
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;