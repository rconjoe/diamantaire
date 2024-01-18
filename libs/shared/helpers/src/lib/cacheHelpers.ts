let TTL = 1800;
let MAX_AGE = 180;
let REVALIDATE = 60 * 60;

if (process.env.NODE_ENV.includes('preview')) {
  TTL = 30;
  MAX_AGE = 5;
  REVALIDATE = 60;
} else if (process.env.NODE_ENV === 'development') {
  TTL = 60;
  MAX_AGE = 10;
  REVALIDATE = 60;
} else if (process.env.NODE_ENV === 'production') {
  TTL = 3600;
  MAX_AGE = 180;
  REVALIDATE = 60 * 60;
}

export function getSWRPageCacheHeader(ttl = TTL, maxAge = MAX_AGE): string{
  const maxAgeSeconds = parseInt(process.env.NEXT_PUBLIC_SWR_MAX_AGE, 10) || maxAge;
  const ttlSeconds = parseInt(process.env.NEXT_PUBLIC_SWR_TTL, 10) || ttl;

  return `s-maxage=${maxAgeSeconds}, stale-while-revalidate=${ttlSeconds}`;
}

export function getSwrRevalidateConfig(){
  return parseInt(process.env.NEXT_PUBLIC_REVALIDATE_SECONDS, 10) || REVALIDATE;
}