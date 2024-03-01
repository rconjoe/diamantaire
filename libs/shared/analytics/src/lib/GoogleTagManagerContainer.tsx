import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { GoogleTagManager } from '@next/third-parties/google';
import { useCookieConsentContext } from '@use-cookie-consent/react';

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;
const isDevEnabled = process.env.NEXT_PUBLIC_LOCAL_GTM === 'true'; // set locally in .env.local
// This should be replaced and unified with a global config settings.
// defined in one place and used everywhere.
// currently being used to fix critical issue due to its variable visibility
const isProdEnv = process.env.NEXT_PUBLIC_APP_ENV === 'production';

const GoogleTagManagerContainer = () => {
  const isUserInEu = getIsUserInEu();
  const { consent } = useCookieConsentContext();
  let isEnabled = false;

  // If no container Id is available, disable GTM
  if (GTM_CONTAINER_ID){
    // on production environment, 
    if (isProdEnv){
      if (!isUserInEu) {
        // Non-Europe: GTM is enabled
        isEnabled = true;
      } else {
         // Europe: GTM is enabled only if both statistics and marketing are accepted
        isEnabled = consent?.statistics && consent?.marketing;
      }
    } else {
      // on development environment, GTM is enabled only if the local GTM is enabled
      isEnabled = isDevEnabled;
    }
  };

  if (!isEnabled) {
    return null;
  }

  return <GoogleTagManager gtmId={GTM_CONTAINER_ID} />;
};

export { GoogleTagManagerContainer };
export default GoogleTagManagerContainer;
