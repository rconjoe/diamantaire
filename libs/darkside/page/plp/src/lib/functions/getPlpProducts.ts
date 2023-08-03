export default async function getPlpProducts({ qParams, page = 1 }) {
  let response;

  try {
    response = await fetch(`${process.env.VRAI_SERVER_BASE_URL}/v1/products/plp?${qParams}&limit=12&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.VRAI_SERVER_API_KEY,
      },
    });
  } catch (error) {
    console.log({ getPlpError: error });
  }

  const productData = await response.json();

  return productData;
}
