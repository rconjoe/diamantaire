/* eslint-disable */

declare global {
  interface Window {
    rudderanalytics?: any;
  }
}

export async function rudderInitialize() {
  (function () {
    const e = (window.rudderanalytics = window.rudderanalytics || []);

    (e.methods = [
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
    ]),
      (e.factory = function (t) {
        return function () {
          e.push([t].concat(Array.prototype.slice.call(arguments)));
        };
      });
    for (let t = 0; t < e.methods.length; t++) {
      const r = e.methods[t];

      e[r] = e.factory(r);
    }
    (e.loadJS = function (e, t) {
      const r = document.createElement('script');

      (r.type = 'text/javascript'), (r.async = !0), (r.src = 'https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js');
      const a = document.getElementsByTagName('script')[0];

      a.parentNode.insertBefore(r, a);
    }),
      e.loadJS(),
      e.load('2N6k1I03PftQoZVEi41Z1X1lQYi', 'https://vraisamdhast.dataplane.rudderstack.com'), // Replace 'WRITE-KEY' and 'DATAPLANE-URL'
      e.page();
  })();
}
