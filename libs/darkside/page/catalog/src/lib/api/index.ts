import { queryClientApi } from '@diamantaire/darkside/data/api';

export const getCollectionSlugsByProductType = async () => {
  const response = await queryClientApi().request({ url: `/collections/slugs` });

  return response.data;
};

export const getCollectionOptions = async (selectedSlug, selectedOptions) => {
  const qParams = new URLSearchParams({ slug: selectedSlug, ...selectedOptions });
  const reqUrl = `/collections/options?${qParams.toString()}`;

  const response = await queryClientApi().request({ url: reqUrl });

  return response.data;
};

export const getProducts = async (selectedSlug, selectedOptions) => {
  const qParams = new URLSearchParams({ slug: selectedSlug, ...selectedOptions });
  const reqUrl = `/collections?${qParams.toString()}`;

  const response = await queryClientApi().request({ url: reqUrl });

  return response.data;
};
