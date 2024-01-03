let TTL = 1800;
let MAX_AGE = 180;

if (process.env.NODE_ENV.includes('preview')) {
  TTL = 30;
  MAX_AGE = 5;
} else if (process.env.NODE_ENV === 'development') {
  TTL = 60;
  MAX_AGE = 10;
} else if (process.env.NODE_ENV === 'production') {
  TTL = 3600;
  MAX_AGE = 180;
}

export function getSWRPageCacheHeader(ttl = TTL, maxAge = MAX_AGE): [string, string]{
  return ['Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=${ttl}`];
}