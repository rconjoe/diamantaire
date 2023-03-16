import { queryDatoGQL, showroomNav as SHOWROOM_NAV_QUERY } from '@diamantaire/darkside/data/api';

type ShowroomNavReponse = {
  showroomNav?: {
    links: Array<{
      route: string;
    }>;
  };
};

export async function getAllShowroomSlugs(): Promise<string[]> {
  let response: ShowroomNavReponse = {};
  let navItems = [];

  try {
    // eslint-disable-next-line no-await-in-loop
    response = await queryDatoGQL({
      query: SHOWROOM_NAV_QUERY,
      variables: {
        locale: 'en_US',
      },
    });

    if (response?.showroomNav) {
      navItems = [...navItems, ...response.showroomNav.links];
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error occured while fetching Standard Page slugs', error);
  }

  return navItems.map((showroomLink) => {
    return showroomLink.route.replace('https://www.vrai.com/showrooms', '/showrooms');
  });
}
