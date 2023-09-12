type FetchDataProps = {
  url: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: unknown;
};

export async function fetchData({ url, body, method = 'POST' }: FetchDataProps) {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    return json;
  } catch (e) {
    console.log('fetchData error', e);

    return null;
  }
}
