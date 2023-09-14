/* eslint-disable camelcase */
import { isProdEnv } from '@diamantaire/shared/constants';
import { useEffect, createContext, useContext } from 'react';
import TagManager from 'react-gtm-module';

type AnalyticsContextType = {
  viewPage: (pageName: string) => void;
  productViewed: (eventData: Record<string, any>) => void;
  emitDataLayer: (data: Record<string, any>) => void;
  productListViewed: ({ listName, category, variantIds, products }) => void;
  productClicked: (eventData: Record<string, any>) => void;
  productListFiltered: (eventData: Record<string, any>) => void;
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
  viewItem: 'view_item',
  selectDiamond: 'select_diamond',
  viewListPage: 'viewListPage',
  productClicked: 'productClicked',
  productListFiltered: 'productListFiltered',
};

export const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
  events: GTM_EVENTS,
};

const shouldEnableTracking = () => {
  return (isProdEnv && Boolean(process.env.NEXT_PUBLIC_GTM_CONTAINER_ID)) || process.env.NEXT_PUBLIC_LOCAL_GTM === 'true';
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
    productListViewed: ({ listName, category, variantIds, products }) => {
      trackEvent(GTM_EVENTS.viewListPage, { listName, category, variantIds, products });
    },
    productClicked: (eventData: Record<string, any>) => {
      trackEvent(GTM_EVENTS.productClicked, eventData);
    },
    productListFiltered: (eventData: Record<string, any>) => {
      trackEvent(GTM_EVENTS.productListFiltered, eventData);
    },
    // generic method to emit data layer
    emitDataLayer: (data: Record<string, any>) => {
      if (shouldEnableTracking()) {
        TagManager.dataLayer({ dataLayer: { ...data } });
      }
    },
  };

  return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
};

export const normalizeVariantConfigurationForGTM = (configuration: Record<string, any>) => {
  const normalizedConfiguration: Record<string, any> = {};

  for (const [key, value] of Object.entries(configuration)) {
    switch (key) {
      case 'diamondType':
        normalizedConfiguration.diamond_type = value;
        break;
      case 'goldPurity':
        normalizedConfiguration.gold_purity = value;
        break;
      case 'caratWeight':
        normalizedConfiguration.carat_weight = value;
        break;
      case 'bandAccent':
        normalizedConfiguration.band_accent = value;
        break;
      default:
        normalizedConfiguration[key] = value;
        break;
    }
  }

  return normalizedConfiguration;
};
