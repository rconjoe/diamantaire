export async function shopifyAdminRestApi(path: string, method?: string, body?: string) {
  const baseURL = `https://${process.env['NEXT_PUBLIC_SHOPIFY_STORE_URL']}/admin/api/2023-10${path}`;

  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': process.env['SHOPIFY_ADMIN_API_TOKEN'] || '',
  };

  const response = await fetch(baseURL, {
    headers,
    ...(body ? { body } : {}),
    method: method ? method : 'GET',
  })
    .then((res) => res.json())
    .then((json) => json);

  return response;
}
