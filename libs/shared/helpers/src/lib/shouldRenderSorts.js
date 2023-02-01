import { DIAMOND_LIST_PAGE_SLUGS } from '@diamantaire/shared/constants';

const SLUGS = [
  'bracelets-jewelry',
  'earrings-jewelry',
  'necklaces-jewelry',
  'rings-jewelry',
  'all-jewelry',
  ...DIAMOND_LIST_PAGE_SLUGS,
];

export const shouldRenderSorts = (slug) => {
  return SLUGS.includes(slug);
};

export default shouldRenderSorts;
