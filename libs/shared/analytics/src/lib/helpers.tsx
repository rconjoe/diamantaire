// analytics.js

import { isProdEnv } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCookieConsentContext } from '@use-cookie-consent/react';

export const GTM_EVENTS = {
  viewPage: 'viewPage',
  viewItem: 'view_item',
  selectDiamond: 'select_diamond',
  productListViewed: 'view_item_list',
  productClicked: 'productClicked',
  productListFiltered: 'productListFiltered',
  cartViewed: 'cartViewed',
  selectShape: 'select_shape',
  addToCart: 'add_to_cart',
  removeFromCart: 'remove_from_cart',
  beginCheckout: 'begin_checkout',
};

const shouldEnableTracking = (consent) => {
  const isUserInEu = getIsUserInEu();
  const hasAcceptedStatistics = consent?.statistics || false;
  const hasAcceptedMarketing = consent?.marketing || false;

  const isGTMEnabled = Boolean(process.env.NEXT_PUBLIC_GTM_CONTAINER_ID);
  const isDevEnabled = process.env.NEXT_PUBLIC_LOCAL_GTM === 'true';

  // Check if GTM should be enabled based on environment and configuration
  const enableTracking = isGTMEnabled && (isProdEnv || isDevEnabled);

  // For EU users, require additional cookie consent
  return isUserInEu ? enableTracking && hasAcceptedStatistics && hasAcceptedMarketing : enableTracking;
};

const createTrackEvent = (isTrackingEnabled) => async (eventName, data) => {
  if (isTrackingEnabled()) {
    try {
      await sendGTMEvent({ event: eventName, ...data });
    } catch (error) {
      console.error('Error sending analytics event:', error);
    }
  } else {
    logInDev('Analytics disabled or consent not given', { event: eventName, data });
  }
};

export const useAnalytics = () => {
  const { consent } = useCookieConsentContext();
  const isTrackingEnabled = () => shouldEnableTracking(consent);

  const trackEvent = createTrackEvent(isTrackingEnabled);

  const viewPage = async (pageName) => {
    await trackEvent(GTM_EVENTS.viewPage, { pageName });
  };

  const productAdded = async (eventData) =>
    await trackEvent(GTM_EVENTS.addToCart, { ...eventData, ...createGA360Data(GTM_EVENTS.addToCart, eventData.name) });

  const productRemoved = async (eventData) =>
    await trackEvent(GTM_EVENTS.removeFromCart, {
      ...eventData,
      ...createGA360Data(GTM_EVENTS.removeFromCart, eventData.name),
    });

  const productViewed = async (eventData) => {
    await trackEvent(GTM_EVENTS.viewItem, eventData);
  };

  const productListViewed = async (eventData) => {
    await trackEvent(GTM_EVENTS.productListViewed, eventData);
  };

  const productClicked = async (eventData) => {
    await trackEvent(GTM_EVENTS.productClicked, eventData);
  };

  const cartViewed = async (eventData) => {
    await trackEvent(GTM_EVENTS.cartViewed, eventData);
  };

  const checkoutStarted = async (eventData) =>
    await trackEvent(GTM_EVENTS.beginCheckout, { ...eventData, ...createGA360Data(GTM_EVENTS.beginCheckout, '1') });

  const emitDataLayer = async (data) => {
    if (shouldEnableTracking(consent)) {
      try {
        await sendGTMEvent(data);
      } catch (error) {
        console.error('Error sending analytics event:', error);
      }
    } else {
      logInDev('Analytics disabled or consent not given', { data });
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

// Utility function to create GA360 data
const createGA360Data = (eventName, name) => ({
  event: eventName,
  eventCategory: 'Ecommerce',
  eventAction: eventName,
  eventLabel: name,
});

// Utility function for console logging in dev environment
const logInDev = (message, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, data);
  }
};
