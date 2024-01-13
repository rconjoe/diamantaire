import { kv } from '@vercel/kv';
import axios from 'axios';
import 'dotenv/config';
// goldPurity=18k&bandAccent=pave&ringSize=5&bandWidth=standard&hiddenHalo=no&flow=setting
// goldPurity=18k&bandAccent=pave&ringSize=5&bandWidth=standard&hiddenHalo=no&caratWeight=1.0ct&flow=setting
const ORDERED_CONFIGURATION_PROPERTIES = [
  'diamondType',
  'metal',
  'goldPurity',
  'bandAccent',
  'bandWidth',
  'hiddenHalo',
  'caratWeight',
  'sideStoneShape',
  'sideStoneCarat',
  'bandStyle',
  'ceramicColor',
  'diamondSize'
];

async function getProducts(page = 1) {
  const response = await axios({
    method: 'get',
    url: `${process.env['VRAI_SERVER_BASE_URL']}/v1/products/feed?limit=100&page=${page}`,
    headers: {
      'x-api-key': process.env['API_KEY'],
      'Content-type': 'application/json',
    },
  });

  if (response.status === 200) {
    console.log('Successful request');

    return response.data;
  } else {
    console.log('Error retrieving data');
  }
}

function getProductTypeFromUrlPath(productType): string {
  switch (productType) {
    case 'Engagement Ring': {
      return 'engagement-rings';
    }
    case 'Wedding Band': {
      return 'wedding-bands';
    }
    case 'Earrings': {
      return 'jewelry/earrings';
    }
    case 'Necklace': {
      return 'jewelry/necklaces';
    }
    case 'Gift Card':
    case 'Ring Sizer':
    case 'Ring': {
      return 'jewelry/rings';
    }
    case 'Bracelet': {
      return 'jewelry/bracelets';
    }
    case 'Accessory': {
      return 'jewelry/accessories';
    }
    default: {
      console.log('unhandled product type for URL path', productType);
    }
  }
}

function getProductTypeToUrlPath(productType) {
  switch (productType) {
    case 'Engagement Ring': {
      return 'engagement-ring';
    }
    case 'Wedding Band': {
      return 'wedding-bands';
    }
    case 'Earrings': {
      return 'jewelry/earrings';
    }
    case 'Necklace': {
      return 'jewelry/necklaces';
    }
    case 'Gift Card':
    case 'Ring Sizer':
    case 'Ring': {
      return 'jewelry/rings';
    }
    case 'Bracelet': {
      return 'jewelry/bracelets';
    }
    case 'Accessory': {
      return 'jewelry/accessories';
    }
    default: {
      console.log('unhandled product type for URL path', productType);
    }
  }
}

function getConfigurationType(productType): { subpath: string[]; query: string[] } {
  switch (productType) {
    case 'Engagement Ring': {
      const subpathProperties = ['diamondType', 'metal'];

      return {
        subpath: subpathProperties,
        query: ORDERED_CONFIGURATION_PROPERTIES.filter((prop) => !subpathProperties.includes(prop)),
      };
    }
    case 'Wedding Band': {
      const excludedProperties = ['diamondType'];

      return {
        subpath: [],
        query: ORDERED_CONFIGURATION_PROPERTIES.filter((prop) => !excludedProperties.includes(prop)),
      };
    }
    case 'Accessory':
    case 'Ring Sizer':
    case 'Gift Card':
    case 'Earrings': // Jewelry starts here
    case 'Necklace':
    case 'Ring':
    case 'Bracelet': {
      return {
        subpath: [],
        query: ORDERED_CONFIGURATION_PROPERTIES,
      };
    }
    default: {
      console.log('unhandled product type', productType);

      return {
        subpath: [],
        query: [],
      };
    }
  }
}

function getUrlSubPathAndQueryParams(configuration, productType) {
  const { subpath, query } = getConfigurationType(productType);
  const subPathArray = subpath.reduce((path, prop) => {
    if (configuration[prop]) {
      path.push(configuration[prop]);
    }

    return path;
  }, []);

  const queryParams = query.reduce((params, prop) => {
    if (configuration[prop]) {
      params[prop] = configuration[prop];
    }

    return params;
  }, {});

  return {
    subPath: subPathArray,
    queryParams,
  };
}

function generateFromUrl(product, baseUrl = 'https://www.vrai.com') {
  const { configuration, productType, collectionSlug } = product;
  // get category and collection url segment
  const urlArr = [baseUrl, getProductTypeFromUrlPath(productType), collectionSlug];
  // get configuration URL segment
  const { subPath, queryParams } = getUrlSubPathAndQueryParams(configuration, productType);

  let toUrl = urlArr.concat(subPath).join('/');
  const searchParams = new URLSearchParams(queryParams);

  searchParams.sort();

  if (Array.from(searchParams).length > 0) {
    toUrl = `${toUrl}?${searchParams.toString()}`;
  }

  return toUrl;
}

function generateToUrl(product, baseUrl = 'https://diamantaire.vercel.app') {
  const { productType, collectionSlug, productSlug } = product;
  const urlArr = [baseUrl, getProductTypeToUrlPath(productType), collectionSlug, productSlug];

  return urlArr.join('/');
}

function isCanonicalConfiguration(configuration: Record<string, string>, productType: string){
  return Object.entries(configuration).every(([type, value]) => {
    if(productType === 'Engagement Ring' && ['diamondType','metal', 'goldPurity'].includes(type)){
      return true;
    } else if (['goldPurity'].includes(type)){
      return true;
    }

    const canonicalValues = {
      diamondType: ['round-brilliant'],
      metal: ['yellow-gold'],
      bandAccent: ['plain'],
      bandWidth: ['standard'],
      hiddenHalo: ['no'],
      caratWeight: ['other'],
      sideStoneShape: ['round-brilliant'],
      diamondOrientation: ['vertical'],
      sideStoneCarat: ['0.1ct'],
      bandStyle: ['full'],
      ceramicColor: ['black'],
      diamondSize: ['medium','original'],
    }

    if (!canonicalValues[type]){
      return true
    }

    if(canonicalValues[type] && canonicalValues[type].includes(value)){
      return true
    }

  });
}

type RedirectData = {
  destination: string;
  isPermanent: boolean;
}

function generateRedirects(products, fromBaseUrl, toBaseUrl) {
  if (!products) {
    console.log('No products provided');

    return;
  }
  const redirects = products.reduce((r: RedirectData[], current) => {

    if (current.configuration.diamondOrientation === "horizontal"){
      return r;
    }

    const isCanonical = isCanonicalConfiguration(current.configuration, current.productType);
    const source = generateFromUrl(current, fromBaseUrl);
    const destination = generateToUrl(current, toBaseUrl);
    const isPermanent = true;

    r[source] = {
      destination,
      permanent: isPermanent,
    };

    if (isCanonical){
      r[source.split('?')?.[0] || source] = {
        destination,
        permanent: isPermanent,
      }
    }

    return r;
  }, {});

  return redirects;
}

export function publishRedirects(redirects: Record<string, { destination: string; permanent: boolean }>[]) {
  Object.keys(redirects).forEach((source) => {
    const { destination, permanent } = redirects[source];

    kv.hset('redirects', { [source]: destination });
    if (permanent) kv.sadd(source, 'permanent_redirects');
  });
}

export async function getPdpRedirects(sourceBaseUrl = 'https://www.vrai.com', targetBaseUrl = 'http://localhost:4200'): Promise<Record<string, RedirectData>> {
  let data;
  let hasNextPage;

  let page = 1;
  let redirects = {};

  do {
    console.log('requesting page', page);
    /* eslint-disable-next-line no-await-in-loop */
    data = await getProducts(page);
    hasNextPage = data?.paginator?.hasNextPage;
    page += 1;

    redirects = {...redirects, ...generateRedirects(data.items, sourceBaseUrl, targetBaseUrl)};
  } while (hasNextPage);

  return redirects;
}
