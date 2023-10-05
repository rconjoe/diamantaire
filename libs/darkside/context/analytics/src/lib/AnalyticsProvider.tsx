/* eslint-disable camelcase */
import { isProdEnv } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/helpers';
import { useCookieConsentContext } from '@use-cookie-consent/react';
import { useEffect, createContext, useContext, useState } from 'react';
import TagManager from 'react-gtm-module';

type AnalyticsContextType = {
  viewPage: (pageName: string) => void;
  productViewed: (eventData: Record<string, any>) => void;
  emitDataLayer: (data: Record<string, any>) => void;
  productListViewed: ({ listName, category, variantIds, products }) => void;
  productAdded: (eventData: Record<string, any>) => void;
  productRemoved: (eventData: Record<string, any>) => void;
  productClicked: (eventData: Record<string, any>) => void;
  productListFiltered: (eventData: Record<string, any>) => void;
  cartViewed: (eventData: Record<string, any>) => void;
  checkoutStarted: (eventData: Record<string, any>) => void;
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
  cartViewed: 'cartViewed',
  selectShape: 'select_shape',
  addToCart: 'add_to_cart',
  removeFromCart: 'remove_from_cart',
  beginCheckout: 'begin_checkout',
};

export const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
  events: GTM_EVENTS,
};

const shouldEnableTracking = ({ consent, isUserInEu }) => {
  // Check if the user has accepted statistics and marketing cookies
  const hasAcceptedStatistics = consent?.statistics || false;
  const hasAcceptedMarketing = consent?.marketing || false;
  const enableTracking =
    (isProdEnv && Boolean(process.env.NEXT_PUBLIC_GTM_CONTAINER_ID)) || process.env.NEXT_PUBLIC_LOCAL_GTM === 'true';

  if (!isUserInEu) {
    return enableTracking;
  }

  // EU users must accept statistics and marketing cookies to enable tracking
  return enableTracking && hasAcceptedStatistics && hasAcceptedMarketing;
};

const createTrackEvent = (isEnabled) => {
  return (event, data) => {
    if (isEnabled) {
      TagManager.dataLayer({ dataLayer: { event, ...data } });
    } else {
      console.log('no analytics', { event, data });
    }
  };
};

export const AnalyticsProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const { consent } = useCookieConsentContext();

  const trackEvent = createTrackEvent(isEnabled);

  useEffect(() => {
    const isUserInEu = getIsUserInEu();

    if (shouldEnableTracking({ consent, isUserInEu })) {
      setIsEnabled(true);
      TagManager.initialize(tagManagerArgs);
    }
  }, [isEnabled, consent]);

  const analytics = {
    viewPage: (pageName: string) => {
      trackEvent(GTM_EVENTS.viewPage, { pageName });
    },
    productAdded: (eventData: Record<string, any>) => {
      const { name } = eventData;
      const ga360Data = {
        event: GTM_EVENTS.addToCart,
        eventCategory: 'Ecommerce',
        eventAction: GTM_EVENTS.addToCart,
        eventLabel: name,
      };
      const mergedData = { ...eventData, ...ga360Data };

      trackEvent(GTM_EVENTS.addToCart, mergedData);
    },
    productRemoved: (eventData: Record<string, any>) => {
      const { name } = eventData;
      const ga360Data = {
        event: GTM_EVENTS.removeFromCart,
        eventCategory: 'Ecommerce',
        eventAction: GTM_EVENTS.removeFromCart,
        eventLabel: name,
      };
      const mergedData = { ...eventData, ...ga360Data };

      trackEvent(GTM_EVENTS.removeFromCart, mergedData);
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
    cartViewed: (eventData: Record<string, any>) => {
      trackEvent(GTM_EVENTS.cartViewed, eventData);
    },
    checkoutStarted: (eventData: Record<string, any>) => {
      const ga360Data = {
        event: GTM_EVENTS.beginCheckout,
        eventCategory: 'Ecommerce',
        eventAction: GTM_EVENTS.beginCheckout,
        eventLabel: '1',
      };
      const mergedData = { ...eventData, ...ga360Data };

      trackEvent(GTM_EVENTS.beginCheckout, mergedData);
    },
    // generic method to emit data layer
    emitDataLayer: (data: Record<string, any>) => {
      if (isEnabled) {
        TagManager.dataLayer({ dataLayer: { ...data } });
      }
    },
  };

  return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
};

export const normalizeVariantConfigurationForGTM = (configuration: Record<string, any>) => {
  const normalizedConfiguration: Record<string, any> = {};

  if (configuration) {
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
  }
};
