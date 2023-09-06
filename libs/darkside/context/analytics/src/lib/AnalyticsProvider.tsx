import { useEffect, createContext, useContext } from 'react';
import TagManager from 'react-gtm-module';

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
};

export const tagManagerArgs = {
  gtmId: process.env.GTM_CONTAINER_ID || 'GTM-KK5KX69',
  events: GTM_EVENTS,
};

export const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    // Initialize GTM here with your GTM container ID
    TagManager.initialize(tagManagerArgs);
  }, []);

  const analytics = {
    viewPage: (pageName: string) => {
      TagManager.dataLayer({ dataLayer: { event: GTM_EVENTS.viewPage, pageName } });
    },
    productViewed: (eventData: Record<string, any>) => {
      console.log({ eventData });

      TagManager.dataLayer({ dataLayer: { event: GTM_EVENTS.productViewed, ...eventData } });
    },
  };

  return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
};
