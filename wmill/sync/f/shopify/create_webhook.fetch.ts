// Fetch-only script, no imports allowed but benefits from a dedicated highly efficient runtime
type CShopifyAdmin = {
  url: string,
  access_token: string
}

export async function main(rs: CShopifyAdmin, webhook: { address: string, topic: string, format: string} ) {
  // "3" is the default value of example_input, it can be overriden with code or using the UI
  const res = await fetch(`${rs.url}/webhooks.json`, {
    method: 'POST',
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": `${rs.access_token}` },
    body: JSON.stringify({webhook: webhook})
  });
  return res.json();
}
