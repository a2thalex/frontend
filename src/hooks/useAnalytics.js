import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function' && location) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    } else if (!location) {
      console.warn('Location is not available');
    } else {
      console.warn('Google Analytics not initialized');
    }
  }, [location]);

  const trackEvent = (action, category, label, value) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    } else {
      console.warn('Google Analytics not initialized');
    }
  };

  return { trackEvent };
};
