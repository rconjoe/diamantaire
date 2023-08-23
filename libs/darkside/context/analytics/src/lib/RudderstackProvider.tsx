import React, { createContext, useContext, useEffect } from 'react';
declare global {
  interface Window {
    rudderanalytics?: RudderAnalytics;
  }
}

interface RudderAnalytics {
  load: (writeKey: string, dataPlaneUrl: string) => void;
  page: () => void;
  track: (event: string, properties: Record<string, any>) => void;
  identify: (userId: string, traits: Record<string, any>) => void;
  alias: (newId: string, originalId: string) => void;
  group: (groupId: string, traits: Record<string, any>) => void;
  ready: (callback: () => void) => void;
  reset: () => void;
  getAnonymousId: () => string;
  setAnonymousId: (anonymousId: string) => void;
  getUserId: () => string;
  getUserTraits: () => Record<string, any>;
  getGroupId: () => string;
  getGroupTraits: () => Record<string, any>;
  startSession: () => void;
  endSession: () => void;
}

type RudderstackProviderProps = {
  children: React.ReactNode;
};

type RudderstackContextType = {
  trackEcommerceEvent: (event: string, properties: Record<string, any>) => void;
  trackPageView: () => void;
};

const RudderstackContext = createContext<RudderstackContextType | undefined>(undefined);

export const useRudderstack = (): RudderstackContextType => {
  const context = useContext(RudderstackContext);

  if (!context) {
    throw new Error('useRudderstack must be used within a RudderstackProvider');
  }

  return context;
};

const RudderstackProvider: React.FC<RudderstackProviderProps> = ({ children }) => {
  useEffect(() => {
    const loadRudderStack = async () => {
      if (!window.rudderanalytics) {
        const windowRudderanalytics: RudderAnalytics[] = (window.rudderanalytics = []);

        windowRudderanalytics.methods = [
          'load',
          'page',
          'track',
          'identify',
          'alias',
          'group',
          'ready',
          'reset',
          'getAnonymousId',
          'setAnonymousId',
          'getUserId',
          'getUserTraits',
          'getGroupId',
          'getGroupTraits',
          'startSession',
          'endSession',
        ];

        // Factory function to create RudderStack methods
        windowRudderanalytics.factory = function (t) {
          return function () {
            windowRudderanalytics.push([t].concat(Array.from(arguments)));
          };
        };

        // Create RudderStack methods
        windowRudderanalytics.methods.forEach((r) => {
          windowRudderanalytics[r] = windowRudderanalytics.factory(r);
        });

        // Load RudderStack library script
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js';
        const firstScript = document.getElementsByTagName('script')[0];

        firstScript.parentNode.insertBefore(script, firstScript);

        // Load RudderStack and track the initial page view
        windowRudderanalytics.load('2UAYRK0ZoTfyotdORlAATyZugQ3', 'https://dfvodevspwfsas.dataplane.rudderstack.com');
      }
    };

    loadRudderStack();
  }, []);

  const waitForRudderStackReady = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (window.rudderanalytics) {
        window.rudderanalytics.ready(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  };

  const trackEcommerceEvent = async (event: string, properties: Record<string, any>) => {
    await waitForRudderStackReady();
    if (window.rudderanalytics) {
      window.rudderanalytics.track(event, properties);
    }
  };

  const trackPageView = async () => {
    await waitForRudderStackReady();
    if (window.rudderanalytics) {
      window.rudderanalytics.page();
    }
  };

  const contextValue = {
    trackEcommerceEvent,
    trackPageView,
  };

  return <RudderstackContext.Provider value={contextValue}>{children}</RudderstackContext.Provider>;
};

export { RudderstackProvider };
