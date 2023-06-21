import { getRootURL } from '../constant.helpers';

const ENV_SUBDOMAIN = 'vrai.com';

export const VO_ROOT_URL = 'https://www.vrai.com';
export const VO_SHOPIFY_URL = 'https://vrai.com';
export const VRAI_SHOPIFY_CART_JSON_URL = 'https://vrai.com/cart.json';
export const BOOK_AN_APPOINTMENT_URL = 'https://www.vrai.com/book-appointment';
export const VRAI_CHINA_URL = 'http://www.vrai.cn';
export const EU_DOMAIN_URL = getRootURL(ENV_SUBDOMAIN, 'eu'); // 'https://eu.vrai.com';
export const DE_DOMAIN_URL = getRootURL(ENV_SUBDOMAIN, 'de'); // 'https://de.vrai.com';
export const PRIMARY_DOMAIN_URL = getRootURL(ENV_SUBDOMAIN);
export const GCAL_CERTIFICATE_ROOT_URL = 'http://images.gemfacts.com/GCALimages/Certs/';
export const DF_CERTIFICATE_ROOT_URL = 'https://certificate.diamondfoundry.com/download/';
export const HREFLANG_MAP = {
  'en-us': [PRIMARY_DOMAIN_URL],
  de: [DE_DOMAIN_URL],
  'de-de': [DE_DOMAIN_URL],
  'de-at': [DE_DOMAIN_URL],
  'de-ch': [getRootURL(ENV_SUBDOMAIN, 'ch')],
  'en-gb': [getRootURL(ENV_SUBDOMAIN, 'uk')],
  'en-ca': [PRIMARY_DOMAIN_URL],
  fr: [getRootURL(ENV_SUBDOMAIN, 'fr')],
  'fr-fr': [getRootURL(ENV_SUBDOMAIN, 'fr')],
  'es-es': [getRootURL(ENV_SUBDOMAIN, 'es')],
  'en-it': [getRootURL(ENV_SUBDOMAIN, 'it')],
  'en-nl': [getRootURL(ENV_SUBDOMAIN, 'nl')],
  'en-se': [getRootURL(ENV_SUBDOMAIN, 'se')],
  'en-no': [getRootURL(ENV_SUBDOMAIN, 'no')],
  'en-dk': [getRootURL(ENV_SUBDOMAIN, 'dk')],
  'en-be': [getRootURL(ENV_SUBDOMAIN, 'be')],
  'x-default': [PRIMARY_DOMAIN_URL],
};
export const REGIONAL_REDIRECTS = {
  CN: VRAI_CHINA_URL,
  TW: VRAI_CHINA_URL,
  HK: VRAI_CHINA_URL,
  GB: getRootURL(ENV_SUBDOMAIN, 'uk'), // 'https://uk.vrai.com',
  DE: DE_DOMAIN_URL,
  AT: DE_DOMAIN_URL,
  CH: getRootURL(ENV_SUBDOMAIN, 'ch'), // 'https://ch.vrai.com',
  FR: getRootURL(ENV_SUBDOMAIN, 'fr'), // 'https://fr.vrai.com',
  ES: getRootURL(ENV_SUBDOMAIN, 'es'), // 'https://es.vrai.com',
  IT: getRootURL(ENV_SUBDOMAIN, 'it'), // 'https://it.vrai.com',
  NL: getRootURL(ENV_SUBDOMAIN, 'nl'), // 'https://nl.vrai.com',
  SE: getRootURL(ENV_SUBDOMAIN, 'se'), // 'https://se.vrai.com',
  NO: getRootURL(ENV_SUBDOMAIN, 'no'), // 'https://no.vrai.com',
  BE: getRootURL(ENV_SUBDOMAIN, 'be'), // 'https://be.vrai.com',
  DK: getRootURL(ENV_SUBDOMAIN, 'dk'), // 'https://dk.vrai.com',
};
export const CROSS_DOMAIN = {
  allowedOrigins: ['https://vrai.com', 'https://us.vrai.com', 'https://uk.vrai.com'],
  allowedReferer: 'vrai.com',
};
export const ACCOUNT_DETAILS_PATH = '/account/details';
