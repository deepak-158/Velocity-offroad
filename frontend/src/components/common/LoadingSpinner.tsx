import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'var(--color-primary-600)',
  fullPage = false
}) => {
  // Size based on prop
  const dimensions = {
    sm: { width: '24px', height: '24px', borderWidth: '3px' },
    md: { width: '40px', height: '40px', borderWidth: '4px' },
    lg: { width: '64px', height: '64px', borderWidth: '5px' }
  };

  const { width, height, borderWidth } = dimensions[size];

  const spinnerStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: '50%',
    border: `${borderWidth} solid rgba(0, 0, 0, 0.1)`,
    borderTopColor: color,
    borderLeftColor: color,
    animation: 'spin 0.8s linear infinite',
    margin: fullPage ? 'auto' : '0'
  };

  const containerStyle: React.CSSProperties = fullPage
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999
      }
    : {};

  return (
    <div style={containerStyle} className="loading-container" data-testid="loading-spinner">
      <div style={spinnerStyle} className="loading-spinner">
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default LoadingSpinner; 