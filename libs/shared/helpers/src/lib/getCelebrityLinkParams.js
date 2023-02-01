import { default as URI } from 'jsuri';

const RED_CARPET_PAGE_ROUTE = '/spotted';

const getCelebrityLinkParams = (celebrityName) => {
  const link = new URI().setPath(
    `spotted?celebrity=${celebrityName.toLowerCase()}`
  );
  const linkParams = {
    href: {
      pathname: RED_CARPET_PAGE_ROUTE.nextPage,
      query: {
        celebrity: celebrityName,
      },
    },
    as: link.toString(),
  };

  return linkParams;
};

export default getCelebrityLinkParams;
