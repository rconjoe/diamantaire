import { BUILDER_ENGAGEMENT_RING_LIST_PAGE_SLUGS } from '@diamantaire/shared/constants';

const getIsBuilderEngagementRingListPage = (slug) => BUILDER_ENGAGEMENT_RING_LIST_PAGE_SLUGS.includes(slug);

export default getIsBuilderEngagementRingListPage;
