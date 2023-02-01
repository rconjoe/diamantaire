import { hardcodedWeddingBands } from '@diamantaire/shared/constants';

const weddingBandSlugs = hardcodedWeddingBands.map(
  (weddingBandData) => weddingBandData.slug
);

const getIsWeddingBand = (slug) => weddingBandSlugs.includes(slug);

export default getIsWeddingBand;
