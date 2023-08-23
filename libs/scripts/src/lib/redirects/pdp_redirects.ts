/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const axios = require('axios').default;

const CONFIGURATION_PROPERTIES = ['diamondType', 'metal', 'caratWeight', 'bandAccent', 'sideStoneShape', 'sideStoneCarat'];

async function getProducts(page = 1) {
  const response = await axios({
    method: 'get',
    url: `http://localhost:3333/v1/products/feed?limit=100&page=${page}`,
    headers: {
      'x-api-key': '9a508cb5bd527bap332330AK1b4bd9b25b9a508cb5',
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
        query: CONFIGURATION_PROPERTIES.filter((prop) => !subpathProperties.includes(prop)),
      };
    }
    case 'Wedding Band': {
      const excludedProperties = ['diamondType'];

      return {
        subpath: [],
        query: CONFIGURATION_PROPERTIES.filter((prop) => !excludedProperties.includes(prop)),
      };
    }
    case 'GWP':
    case 'Accessory':
    case 'Ring Sizer':
    case 'Gift Card':
    case 'Earrings': // Jewelry starts here
    case 'Necklace':
    case 'Ring':
    case 'Bracelet': {
      return {
        subpath: [],
        query: CONFIGURATION_PROPERTIES,
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
  const urlArr = [baseUrl, getProductTypeFromUrlPath(productType), collectionSlug];
  const { subPath, queryParams } = getUrlSubPathAndQueryParams(configuration, productType);

  let toUrl = urlArr.concat(subPath).join('/');
  const searchParams = new URLSearchParams(queryParams);

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

function generateRedirects(products, toBaseUrl) {
  if (!products) {
    console.log('No products provided');

    return;
  }
  const redirects = products.reduce((redirects, product) => {
    redirects.push({ from: generateFromUrl(product), to: generateToUrl(product, toBaseUrl) });

    return redirects;
  }, []);

  return redirects;
}

function initiateCSVData(headers) {
  return getCSVRows([headers]).concat('\n');
}

function getCSVRows(rows) {
  return rows.map(getCSVRow).join('\n');
}

function getCSVRow(row) {
  return row.join(',');
}

async function getAllRedirects(startpg = 1, toBaseUrl) {
  const headers = ['from', 'to'];
  let data;
  let hasNextPage = true;
  let page = startpg;
  let redirects = [];
  let csvData = initiateCSVData(headers);
  const csvfile = fs.createWriteStream(`/Users/rico.velasco/Documents/redirects/pdp_redirects.csv`);

  while (hasNextPage) {
    console.log('requesting page', page);
    /* eslint-disable-next-line no-await-in-loop */
    data = await getProducts(page);
    hasNextPage = data?.paginator?.hasNextPage;
    page += 1;
    const pageRedirects = generateRedirects(data.items, toBaseUrl);

    redirects = redirects.concat(pageRedirects);
    const rowsArrayData = pageRedirects.reduce((rowsData: string[][], rowObj) => {
      const rowData: string[] = [];

      headers.forEach((header) => {
        if (rowObj[header]) {
          rowData.push(rowObj[header]);
        } else {
          rowData.push('');
        }
      });
      rowsData.push(rowData);

      return rowsData;
    }, []);
    const redirectRows = getCSVRows(rowsArrayData);

    csvData = csvData.concat(redirectRows).concat('\n');
  }

  csvfile.write(csvData);
  csvfile.end();

  return csvData;
}

const [executor, script, startPage, toUrl] = process.argv;

console.log({ executor, script, startPage, toUrl });
const start = startPage ? parseInt(startPage, 10) : undefined;

getAllRedirects(start, toUrl);
