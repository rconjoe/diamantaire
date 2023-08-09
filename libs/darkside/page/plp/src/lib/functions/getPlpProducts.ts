export default async function getPlpProducts(options) {
  const qParams = new URLSearchParams(options).toString();
  let response;
  const reqUrl = `${process.env.VRAI_SERVER_BASE_URL}/v1/products/plp?${qParams}`;

  try {
    response = await fetch(reqUrl, {
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
