// Fetch-only script, no imports allowed but benefits from a dedicated highly efficient runtime
type CShopifyAdmin = {
  url: string,
  access_token: string

}
export async function main(rs: CShopifyAdmin) {
  // "3" is the default value of example_input, it can be overriden with code or using the UI
  const res = await fetch(`${rs.url}/webhooks.json`, {
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": `${rs.access_token}` },
  });
  return res.json();
}
