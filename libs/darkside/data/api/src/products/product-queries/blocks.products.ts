// For BlockPicker components that need products, we need to use the following query:

export async function fetchProductByVariantSlugs(slugs: string[]) {
  if (!slugs || slugs.length === 0) return null;

  const BASE_URL = `${process.env['NEXT_PUBLIC_PROTOCOL']}${process.env['NEXT_PUBLIC_VERCEL_URL']}`;
  const productSlugs = slugs.join(',');

  const baseUrl = typeof window === 'undefined' ? BASE_URL : window.location.origin;

  const apiUrl = `/v1/products/contentids?ids=${productSlugs}`;

  const reqUrl = `${baseUrl}/api/blocks/getBlockProducts?apiUrl=${apiUrl}`;

  const response = await fetch(reqUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res);

  return response;
}
