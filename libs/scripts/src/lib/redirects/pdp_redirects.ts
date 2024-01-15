import { kv } from '@vercel/kv';
import axios from 'axios';

// eslint-disable-next-line import/order
import { optionTypeOrder, configurationOptionValues } from './configurations';
import 'dotenv/config';

import productsData from './data/pdp_collection_data.json';
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

function generateFromUrl(product) {
  const { configuration, productType, collectionSlug } = product;
  // get category and collection url segment
  const urlArr = [getProductTypeFromUrlPath(productType), collectionSlug];
  // get configuration URL segment
  const { subPath, queryParams } = getUrlSubPathAndQueryParams(configuration, productType);

  let toUrl = urlArr.concat(subPath).join('/');
  const searchParams = new URLSearchParams(queryParams);

  searchParams.sort();

  if (Array.from(searchParams).length > 0) {
    toUrl = `${toUrl}?${searchParams.toString()}`;
  }

  return '/'+toUrl;
}

function generateToUrl(product) {
  const { productType, collectionSlug, productSlug } = product;
  const urlArr = [getProductTypeToUrlPath(productType), collectionSlug, productSlug];

  return '/' + urlArr.join('/');
}

type RedirectData = {
  source: string;
  destination: string;
  isPermanent: boolean;
}

export function publishRedirects(redirects: RedirectData[]) {
  redirects.forEach(async (redirect, i) => {
    const { source, destination, isPermanent } = redirect;

    const redirectRecord = { [source]: destination };
    const result = await kv.hset('redirects', redirectRecord);

    console.log(`${i}) Added redirects: ${source} -> ${destination} : ${result}`);
    if (isPermanent) await kv.sadd(source, 'permanent_redirects');

  });
}



type ProductsData = {
  productType: string;
  // collectionSlug: string,
  productSlug: string;
  configuration: Record<string, string>
}

export function getPdpRedirects(): RedirectData[] {
  return Object.entries(productsData).reduce((acc, [collectionSlug, products]: [string, ProductsData[]]) => {
    const pWc = products.map(p => ({ ...p, collectionSlug}));

    const sortedProducts = pWc.sort(sortConfiguration);

    // Collection Level Redirect
    const primaryProduct = sortedProducts[0];

    acc.push({
      source: generateCollectionUrl(primaryProduct),
      destination: generateToUrl(primaryProduct),
      isPermanent: true,
    });

    // Products w/o queries
    if (primaryProduct.productType === 'Engagement Ring'){
      configurationOptionValues['diamondType'].forEach( diamondType => {
        configurationOptionValues['metal'].forEach( metal => {
          const canonicalProduct = sortedProducts.find(p => (
            p.configuration.diamondType === diamondType &&
            p.configuration.metal === metal 
          ));

          if (canonicalProduct){
            const source = generateFromUrl(canonicalProduct).split('?')[0];
            const destination = generateToUrl(canonicalProduct);

            acc.push({
              source,
              destination,
              isPermanent: true,
            });
          }
        });
      });
    }

    // Variant Level Redirect
    sortedProducts.forEach(product => {
      if (product.configuration.diamondOrientation !== 'horizontal') {
        const source = generateFromUrl(product);
        const destination = generateToUrl(product);

        acc.push({
          source,
          destination,
          isPermanent: true,
        });
      }
    });

    return acc;
  }, []);
}

function sortConfiguration(a: any, b){
  for(const type of optionTypeOrder){
    const valuesInOrder = configurationOptionValues[type] as string[];
    const aPos = valuesInOrder.indexOf( a.configuration[type]);
    const bPos = valuesInOrder.indexOf(b.configuration[type]);

    if(aPos !== bPos){
      return aPos - bPos;
    }
  }

  return 0;
}

export async function getPdpRedirectData(): Promise<any> {
  let data;
  let hasNextPage;

  let page = 1;
  // let redirects = [];

  // let collectionCanonicals = []
  const productsData = {}

  do {
    console.log('requesting page', page);
    /* eslint-disable-next-line no-await-in-loop */
    data = await getProducts(page);
    hasNextPage = data?.paginator?.hasNextPage;
    page += 1;

    // redirects = [...redirects, ...generateRedirects(data.items)];
    // collectionCanonicals = [ ...collectionCanonicals, ...generateCollectionRedirects(data.items) ];
    data.items.forEach(p => {
      const { configuration, productType, productSlug } = p;
      const reducedP = {
        configuration, productType, productSlug
      }

      if (!productsData[p.collectionSlug]){
        productsData[p.collectionSlug] = [reducedP];
      } else {
        productsData[p.collectionSlug].push(reducedP)
      }
    })
  } while (hasNextPage && page <= 1);

  return productsData;
  // return [ ...redirects, ...collectionCanonicals ];
}

export function generateCollectionRedirects(products){
  const collectionProducts = products.reduce((acc: Record<string, object>, product) => {
    if(!acc[product.collectionSlug]){
      acc[product.collectionSlug] = product;
    }

    return acc;
  }, {});

  return Object.values(collectionProducts).reduce((acc: RedirectData[], product) => {
    // console.log(product)
    acc.push({ source: generateCollectionUrl(product), destination: generateToUrl(product), isPermanent: true });

    return acc;
  },[])
}

function generateCollectionUrl(product){
  return `/${getProductTypeFromUrlPath(product.productType)}/${product.collectionSlug}/`;
}
