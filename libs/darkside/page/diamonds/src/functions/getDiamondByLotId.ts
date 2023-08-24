export async function getDiamondByLotId(options) {
  console.log('get diamond by lot id');

  const qParams = new URLSearchParams(options).toString();

  let response;
  const BASE_URL = `${process.env['VRAI_SERVER_BASE_URL']}`;
  const API_URL = `${BASE_URL}/v1/diamonds/`;
  const reqUrl = `${API_URL}${qParams.toString().replace('lotId=', '')}`;

  console.log('reqUrl weee', reqUrl);

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

  const productData = await response.json();

  return productData;
}
