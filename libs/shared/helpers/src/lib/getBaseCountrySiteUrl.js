import {
  DE_DOMAIN_URL,
  REGIONAL_REDIRECTS,
  PRIMARY_DOMAIN_COUNTRIES,
  PRIMARY_DOMAIN_URL,
  EU_DOMAIN_COUNTRIES,
  EU_DOMAIN_URL,
  DE_DOMAIN_COUNTRIES,
} from '@diamantaire/shared/constants';

export default function getBaseCountrySiteUrl(selectedCountryCode) {
  // Link specific regions to alternate VRAI sites
  let alternateSiteForRegion = REGIONAL_REDIRECTS[selectedCountryCode];

  // Only add a link if region is on a different URL
  if (!alternateSiteForRegion) {
    if (PRIMARY_DOMAIN_COUNTRIES.includes(selectedCountryCode)) {
      alternateSiteForRegion = PRIMARY_DOMAIN_URL;
    } else if (EU_DOMAIN_COUNTRIES.includes(selectedCountryCode)) {
      alternateSiteForRegion = EU_DOMAIN_URL;
    }
  }

  // DE and AT are on the same domain.  No external link necessary
  if (DE_DOMAIN_COUNTRIES.includes(selectedCountryCode)) {
    alternateSiteForRegion = DE_DOMAIN_URL;
  }

  return alternateSiteForRegion;
}
