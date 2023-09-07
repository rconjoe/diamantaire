export async function storefrontClient(body) {
  return await fetch('https://vo-live.myshopify.com/api/2022-10/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': 'd9b6861a35a1db39a04206601dc9d809',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
}
