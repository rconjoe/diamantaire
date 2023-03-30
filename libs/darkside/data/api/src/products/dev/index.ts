import { vraiApiClient } from '../../clients/vraiApiClient';

export async function getProductPage(productSlug, variantSlug) {
  const searchParams = new URLSearchParams({ slug: productSlug, id: variantSlug });
  const apiUrl = `/v1/product?${searchParams.toString()}`;

  const response = await vraiApiClient.get(apiUrl);

  return response.data;
}
