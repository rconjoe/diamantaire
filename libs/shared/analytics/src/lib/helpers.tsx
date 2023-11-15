// analytics.js

import { isProdEnv } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCookieConsentContext } from '@use-cookie-consent/react';

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

// Function to check if tracking should be enabled
const shouldEnableTracking = (consent) => {
  const isUserInEu = getIsUserInEu();
  const hasAcceptedStatistics = consent?.statistics || false;
  const hasAcceptedMarketing = consent?.marketing || false;
  const enableTracking =
    (isProdEnv && Boolean(process.env.NEXT_PUBLIC_GTM_CONTAINER_ID)) || process.env.NEXT_PUBLIC_LOCAL_GTM === 'true';

  return !isUserInEu || (enableTracking && hasAcceptedStatistics && hasAcceptedMarketing);
};

const createTrackEvent = (isTrackingEnabled) => {
  return async (eventName, data) => {
    if (isTrackingEnabled()) {
      try {
        await sendGTMEvent({ event: eventName, ...data });
      } catch (error) {
        console.error('Error sending analytics event:', error);
      }
    } else {
      console.log('Analytics disabled or consent not given', { event: eventName, data });
    }
  };
};

export const useAnalytics = () => {
  const { consent } = useCookieConsentContext();
  const isTrackingEnabled = () => shouldEnableTracking(consent);

  const trackEvent = createTrackEvent(isTrackingEnabled);

  const viewPage = async (pageName) => {
    await trackEvent(GTM_EVENTS.viewPage, { pageName });
  };

  const productAdded = async (eventData) => {
    const { name } = eventData;
    const ga360Data = {
      event: GTM_EVENTS.addToCart,
      eventCategory: 'Ecommerce',
      eventAction: GTM_EVENTS.addToCart,
      eventLabel: name,
    };
    const mergedData = { ...eventData, ...ga360Data };

    await trackEvent(GTM_EVENTS.addToCart, mergedData);
  };

  const productRemoved = async (eventData) => {
    const { name } = eventData;
    const ga360Data = {
      event: GTM_EVENTS.removeFromCart,
      eventCategory: 'Ecommerce',
      eventAction: GTM_EVENTS.removeFromCart,
      eventLabel: name,
    };
    const mergedData = { ...eventData, ...ga360Data };

    await trackEvent(GTM_EVENTS.removeFromCart, mergedData);
  };

  const productViewed = async (eventData) => {
    await trackEvent(GTM_EVENTS.viewItem, eventData);
  };

  const productListViewed = async (eventData) => {
    await trackEvent(GTM_EVENTS.viewListPage, eventData);
  };

  const productClicked = async (eventData) => {
    await trackEvent(GTM_EVENTS.productClicked, eventData);
  };

  const cartViewed = async (eventData) => {
    await trackEvent(GTM_EVENTS.cartViewed, eventData);
  };

  const checkoutStarted = async (eventData) => {
    const ga360Data = {
      event: GTM_EVENTS.beginCheckout,
      eventCategory: 'Ecommerce',
      eventAction: GTM_EVENTS.beginCheckout,
      eventLabel: '1',
    };
    const mergedData = { ...eventData, ...ga360Data };

    await trackEvent(GTM_EVENTS.beginCheckout, mergedData);
  };

  const emitDataLayer = async (data) => {
    if (shouldEnableTracking(consent)) {
      try {
        await sendGTMEvent(data);
      } catch (error) {
        console.error('Error sending analytics event:', error);
      }
    } else {
      console.log('Analytics disabled or consent not given', { data });
    }
  };

  const productListFiltered = async (eventData) => {
    await trackEvent(GTM_EVENTS.productListFiltered, eventData);
  };

  return {
    viewPage,
    productAdded,
    emitDataLayer,
    productListFiltered,
    productRemoved,
    productViewed,
    productListViewed,
    productClicked,
    cartViewed,
    checkoutStarted,
  };
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
