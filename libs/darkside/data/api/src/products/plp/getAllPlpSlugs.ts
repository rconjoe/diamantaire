import { gql } from 'graphql-request';

import { queryDatoGQL } from '../../clients';

export const ALL_PLP_SLUGS_QUERY = gql`
  query AllListPages($first: IntType!, $skip: IntType!) {
    allListPages(skip: $skip, first: $first) {
      slugNew
      category
    }
  }
`;

const REQ_PAGE_SIZE = 100;

type AllPlpPagesReponse = {
  allListPages?: PageData[];
};

type PageData = {
  slugNew: string;
  category: string;
};

export async function getAllPlpSlugs(): Promise<
  {
    slug: string;
    category: string;
  }[]
> {
  let skip = 0,
    response: AllPlpPagesReponse = {};
  let allListPages: PageData[] = [];

  do {
    try {
      // eslint-disable-next-line no-await-in-loop
      response = await queryDatoGQL({
        query: ALL_PLP_SLUGS_QUERY,
        variables: {
          first: REQ_PAGE_SIZE,
          skip,
        },
      });
      if (response?.allListPages) {
        allListPages = [...allListPages, ...response.allListPages];
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error occured while fetching Standard Page slugs', error);
    }
    skip += REQ_PAGE_SIZE;
  } while (response?.allListPages && response?.allListPages?.length === REQ_PAGE_SIZE);

  return allListPages.map((pageData) => {
    const newObject = {
      slug: pageData.slugNew,
      category: pageData.category,
    };

    return newObject;
  });
}
