import { isProdEnv } from '@diamantaire/shared/constants';
import { useEffect, createContext, useContext } from 'react';
import TagManager from 'react-gtm-module';

// For local development, set this to true to enable GTM
const LOCAL_GTM = true;

type AnalyticsContextType = {
  viewPage: (pageName: string) => void;
  productViewed: (eventData: Record<string, any>) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({} as AnalyticsContextType);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }

  return context;
};

export const GTM_EVENTS = {
  viewPage: 'viewPage',
  productViewed: 'productViewed',
  viewItem: 'view_item',
};

export const tagManagerArgs = {
  gtmId: process.env.GTM_CONTAINER_ID || 'GTM-KK5KX69',
  events: GTM_EVENTS,
};

const shouldEnableTracking = () => {
  return isProdEnv || LOCAL_GTM;
};

const trackEvent = (event: string, data: Record<string, any>) => {
  if (shouldEnableTracking()) {
    TagManager.dataLayer({ dataLayer: { event, ...data } });
  } else {
    console.log('no analytics', { event, data });
  }
};

export const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    // Initialize GTM here with your GTM container ID
    if (shouldEnableTracking()) {
      TagManager.initialize(tagManagerArgs);
    }
  }, []);

  const analytics = {
    viewPage: (pageName: string) => {
      trackEvent(GTM_EVENTS.viewPage, { pageName });
    },
    productViewed: (eventData: Record<string, any>) => {
      trackEvent(GTM_EVENTS.viewItem, eventData);
    },
  };

  return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
};
