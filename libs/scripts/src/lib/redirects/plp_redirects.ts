/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const axios = require('axios').default;

const DIAMOND_PLP_DATA_CONFIG_QUERY = `
  query plpQuery($first: IntType, $skip: IntType) {
    allListPages(first: $first, skip: $skip) {
      category
      slug
      slugNew
      diamondPlpDataConfig {
        colors
        diamondTypes
      }
    }
  }
`;

type PlpData = { slug: string; category: string; slugNew: string };
type PlpResponse = { data: { allListPages: PlpData[] } };
type RedirectData = { from: string; to: string };

async function getPlpData(page = 1, limit = 100): Promise<PlpResponse> {
  console.log('request vars:', page, limit);
  const response = await axios({
    method: 'post',
    url: `https://graphql.datocms.com/preview`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer 7a9eaceb223701945fa52207b67811`,
    },
    data: {
      query: DIAMOND_PLP_DATA_CONFIG_QUERY,
      variables: {
        first: limit,
        skip: (page - 1) * limit,
      },
    },
  });

  if (response.status === 200) {
    console.log('Successful request');

    return response.data;
  } else {
    console.log('Error retrieving data');
  }
}

function generatePLPRedirects(plpDataArr: PlpData[], fromUrl = 'https://www.vrai.com', toUrl = 'http://localhost:4200') {
  return plpDataArr.reduce((redirects: RedirectData[], plpData) => {
    const { slug, category, slugNew } = plpData;

    if (!slugNew || !category) {
      console.log('PLP missing slugNew or category', slug);
    }
    redirects.push({
      from: `${fromUrl}/${slug}`,
      to: `${toUrl}/${category}/${slugNew}`,
    });

    return redirects;
  }, []);
}

// : Promise<{ data: { allListPages: RedirectData } } | undefined> ??
async function getAllPlpRedirects() {
  const limit = 100;
  let page = 0;
  let allListPages;
  let redirects = [];

  do {
    page++;
    /* eslint-disable-next-line no-await-in-loop */
    const plpData = await getPlpData(page, limit);

    allListPages = plpData?.data?.allListPages;
    const pageRedirects = generatePLPRedirects(allListPages);

    console.log('requesting page', page, allListPages.length);
    redirects = redirects.concat(pageRedirects);
  } while (allListPages.length >= limit);

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

async function generateRedirectCSV() {
  const headers = ['from', 'to'];
  const csvfile = fs.createWriteStream(`/Users/rico.velasco/Documents/redirects/plp_redirects.csv`);
  const redirectData = await getAllPlpRedirects();
  const csvRows = getCSVRows(redirectData.map(Object.values));
  const csvData = initiateCSVData(headers).concat(csvRows);

  csvfile.write(csvData);
  csvfile.end();
}

generateRedirectCSV();
