import type { RudderAnalytics } from '@rudderstack/analytics-js';
import { useEffect, useState } from 'react';

const useRudderStackAnalytics = (): RudderAnalytics | undefined => {
  const [analytics, setAnalytics] = useState<RudderAnalytics>();

  useEffect(() => {
    if (!analytics) {
      const initialize = async () => {
        const { RudderAnalytics } = await import('@rudderstack/analytics-js');
        const analyticsInstance = new RudderAnalytics();

        analyticsInstance.load('2N6k1I03PftQoZVEi41Z1X1lQYi', 'https://vraisamdhast.dataplane.rudderstack.com');

        analyticsInstance.ready(() => {
          console.log('We are all set!!!');
        });

        setAnalytics(analyticsInstance);
      };

      initialize().catch((e) => console.log(e));
    }
  }, [analytics]);

  return analytics;
};

export { useRudderStackAnalytics };
