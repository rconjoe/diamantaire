import { ALL_STANDARD_PAGE_SLUGS_QUERY, queryDatoGQL } from '@diamantaire/darkside/data/api';

const REQ_PAGE_SIZE = 100;

type AllStandardPagesReponse = {
  allStandardPages?: PageData[];
};

type PageData = {
  slug: string;
};

export async function getAllStandardPageSlugs(): Promise<string[]> {
  let skip = 0,
    response: AllStandardPagesReponse = {};
  let standardPages: PageData[] = [];

  do {
    try {
      // eslint-disable-next-line no-await-in-loop
      response = await queryDatoGQL({
        query: ALL_STANDARD_PAGE_SLUGS_QUERY,
        variables: {
          first: REQ_PAGE_SIZE,
          skip,
        },
      });
      if (response?.allStandardPages) {
        standardPages = [...standardPages, ...response.allStandardPages];
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error occured while fetching Standard Page slugs', error);
    }
    skip += REQ_PAGE_SIZE;
  } while (response?.allStandardPages && response?.allStandardPages?.length === REQ_PAGE_SIZE);

  return standardPages.map((pageData) => pageData.slug);
}
