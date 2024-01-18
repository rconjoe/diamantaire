export async function getCheapestDiamondByDiamondType(diamondType) {
  const BASE_URL = process.env['VRAI_SERVER_BASE_URL'];
  const API_URL = `${BASE_URL}/diamonds/lowestpriced/${encodeURIComponent(diamondType)}`;

  let response;

  try {
    response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.VRAI_SERVER_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.log({ getCheapestDiamondByDiamondTypeError: error });

    return null;
  }

  const productData = await response.json();

  return productData;
}
