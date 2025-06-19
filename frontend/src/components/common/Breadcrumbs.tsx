import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
  customPaths?: { [key: string]: string };
  showHome?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  customPaths = {}, 
  showHome = true 
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Define page titles based on their path
  const defaultPathTitles: { [key: string]: string } = {
    '': 'Home',
    'about': 'About Us',
    'team': 'Team',
    'projects': 'Projects',
    'events': 'Events',
    'gallery': 'Gallery',
    'sponsors': 'Sponsors',
    'news': 'News',
    'contact': 'Contact',
    'admin': 'Admin'
  };

  // Combine default and custom paths
  const pathTitles = { ...defaultPathTitles, ...customPaths };

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
        padding: '0.75rem 0',
        color: '#6B7280',
        fontSize: '0.875rem'
      }}>
        {showHome && (
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <Link 
              to="/"
              style={{
                color: '#6B7280',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary-600)'}
              onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </Link>
            {pathnames.length > 0 && (
              <span style={{ margin: '0 0.5rem', color: '#9CA3AF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </span>
            )}
          </li>
        )}
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={name} style={{ display: 'flex', alignItems: 'center' }}>
              {isLast ? (
                <span style={{ 
                  fontWeight: 600,
                  color: 'var(--color-primary-600)'
                }}>
                  {pathTitles[name] || name}
                </span>
              ) : (
                <>
                  <Link 
                    to={routeTo}
                    style={{
                      color: '#6B7280',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary-600)'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}
                  >
                    {pathTitles[name] || name}
                  </Link>
                  <span style={{ margin: '0 0.5rem', color: '#9CA3AF' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 