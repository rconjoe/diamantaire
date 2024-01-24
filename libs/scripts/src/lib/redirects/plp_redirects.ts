import axios from 'axios';
import 'dotenv/config';

console.log(process.env);

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
// type RedirectData = { source: string; destination: string };

type LocalRedirects = {
  source: string;
  destination: string;
  isPermanent: boolean;
};

async function getPlpData(page = 1, limit = 100): Promise<PlpResponse> {
  console.log('request vars:', page, limit);
  const response = await axios({
    method: 'post',
    url: process.env['DATO_GRAPHQL_URI'] || `https://graphql.datocms.com/preview`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env['DATO_READ_ONLY_TOKEN']}`,
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

type RedirectData = {
  source: string;
  destination: string;
  isPermanent: boolean;
}

function generatePLPRedirects(plpDataArr: PlpData[]): RedirectData[] {
  return plpDataArr.reduce((redirects: LocalRedirects[], plpData) => {
    const { slug, category, slugNew } = plpData;

    if (!slugNew || !category) {
      console.log('PLP missing slugNew or category', slug);

      return redirects;
    }

    const source = `/${slug}`;
    const destination = `/${category}/${slugNew}`;
    const isPermanent = true;

    redirects.push({
      source,
      destination,
      isPermanent,
    });

    return redirects;
  }, []);
}

// : Promise<{ data: { allListPages: RedirectData } } | undefined> ??
export async function getPlpRedirects() {
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
    redirects = [
      ...redirects,
      ...pageRedirects,
    ];
  } while (allListPages.length >= limit);

  return redirects;
}
