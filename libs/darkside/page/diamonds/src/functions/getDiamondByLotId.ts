export async function getDiamondByLotId(options) {
  const qParams = new URLSearchParams(options).toString();

  let response;
  const BASE_URL = `${process.env['VRAI_SERVER_BASE_URL']}`;
  const API_URL = `${BASE_URL}/v1/diamonds/list/`;
  const reqUrl = `${API_URL}${qParams.toString().replace('lotIds=', '')}`;

  console.log('reqUrl', reqUrl);

  try {
    response = await fetch(reqUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.VRAI_SERVER_API_KEY,
      },
    });
  } catch (error) {
    console.log({ getDiamondByLotIdError: error });
  }

  let productData = await response.json();

  productData = productData.filter((item) => item.hidden !== true);

  return productData;
}
