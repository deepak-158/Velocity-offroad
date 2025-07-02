import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: string;
  blurAmount?: number;
  lazyLoad?: boolean;
  onClick?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  placeholder = '',
  blurAmount = 10,
  lazyLoad = true,
  onClick
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazyLoad);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazyLoad || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px' // Load images 200px before they become visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazyLoad, isInView]);  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    console.error('Image failed to load:', src);
    setHasError(true);
    setIsLoaded(true); // Mark as loaded to remove spinner
  };

  // Full CSS style object for container
  const containerStyle: React.CSSProperties = {
    width,
    height,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholder ? 'transparent' : '#f3f4f6',
    display: 'inline-block'
  };
  // Style for low-quality placeholder
  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    objectFit,
    filter: `blur(${blurAmount}px)`,
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 0 : 0.7, // Reduce opacity of placeholder so it's less prominent
    zIndex: 1
  };  // Style for main image
  const imageStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    objectFit,
    opacity: 1, // Always show the image once it's loaded
    transition: 'opacity 0.3s ease',
    zIndex: 2 // Ensure main image appears above placeholder
  };

  // Fallback style for missing images
  const fallbackStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    color: '#9CA3AF',
    fontSize: '0.875rem',
    position: 'absolute',
    top: 0,
    left: 0
  };

  return (
    <div 
      className={`optimized-image ${className}`} 
      style={containerStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Low quality placeholder */}
      {placeholder && (
        <img 
          src={placeholder} 
          alt="" 
          aria-hidden="true"
          style={placeholderStyle}
        />
      )}
        {/* Loading spinner shown only when lazyLoad is enabled and image hasn't started loading */}
      {!isLoaded && !isInView && lazyLoad && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid rgba(0, 0, 0, 0.1)',
            borderTopColor: 'var(--color-primary-600)',
            animation: 'spin 0.8s linear infinite',
          }}>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        </div>
      )}
      
      {/* Fallback for image load errors */}
      {hasError && (
        <div style={fallbackStyle}>
          <div>Image not available</div>
        </div>
      )}
        {/* Main image - loads immediately or when in viewport for lazy loading */}
      {(isInView || !lazyLoad) && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          style={imageStyle}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={lazyLoad ? 'lazy' : undefined}
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedImage; 