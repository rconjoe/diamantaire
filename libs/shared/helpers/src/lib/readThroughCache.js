import debugFor from 'debug';
import cacheManager from 'cache-manager';
import sendEmail from './sendEmail';
import * as Sentry from '@sentry/nextjs';

const debug = debugFor('vo:read-through-cache');

/**
 * By using AWS Elasticache Redis we get a primary write endpoint (which can be used for both read & write)
 * And optionally for region replica's such as the EU, a separate read only endpoint
 * A replica outside of the primary region can share the primary region's write endpoint but read from a
 * cluster specific endpoint nearer to the end user.
 */
const writeCache = getWriteCache();
const readCache = getReadCache();
const internalsPageCache = getInternalsRedisCache();

export function cacheSet(key, value, ttl = 100000) {
  try {
    writeCache.set(key, value, { ttl });

    return value;
  } catch (e) {
    debug('cacheSet cache set failed with error:', [key, e]);
    sendEmail(
      'vo-dev-service-owner@diamondfoundry.com', // TODO: We need a vrai developer address here
      `Vrai cache set failed: ${key}`,
      `Cache set failed on key ${key}.\n\n${e.name}\n${e.message}\n${e.stack}`
    );
  }
}

/**
 * Fetch the value of a key from the cache.
 *
 * This should only be used on warmed keys.
 */
export async function cacheGet(key) {
  const existingEntry = await readCache.get(key);

  if (!existingEntry) {
    Sentry.captureMessage(`cacheGet cache miss for key: ${key}`);
  }

  return existingEntry;
}

/**
 * Either fetch the value of the key from the cache,
 * or run the method to request it from the source.
 *
 * This should always be used for non-warmed data.
 */
export async function cacheGetOrCreate(
  key,
  asyncCreateFn,
  ttl,
  shouldForceCacheRefresh = false
) {
  const existingEntry = await readCache.get(key);

  if (existingEntry) {
    if (!shouldForceCacheRefresh) {
      return existingEntry;
    } else {
      debug('cacheGetOrCreate forcing cache refresh for:', key);
    }
  } else {
    Sentry.captureMessage(`cacheGetOrCreate cache miss for key: ${key}`);
  }

  try {
    const newEntry = await asyncCreateFn();

    if (newEntry) {
      // fire-and-forget set; we don't wait for this to complete before returning the entry
      writeCache.set(key, newEntry, { ttl });
    }

    return newEntry;
  } catch (e) {
    debug('cacheGetOrCreate cache set failed with error:', [key, e]);
    sendEmail(
      'vo-dev-service-owner@diamondfoundry.com', // TODO: We need a vrai developer address here
      `Vrai cache set failed: ${key}`,
      `Cache set failed on key ${key}.\n\n${e.name}\n${e.message}\n${e.stack}`
    );
  }
}

export async function cacheDelete(key) {
  if (!writeCache) {
    return undefined;
  }

  try {
    const deletedEntry = await writeCache.del(key);

    return deletedEntry;
  } catch (e) {
    debug('internalsPageCache delete failed with error:', [key, e]);
  }
}

// search for cache keys that matches the given pattern
export async function cacheFind(keyPattern) {
  if (!internalsPageCache) {
    return undefined;
  }

  const redisStore = readCache.store;

  try {
    const allKeys = await redisStore.keys();
    const matchingKeys = allKeys.filter(key => key.includes(keyPattern));
    const promiseTTL = matchingKeys.map(async key => await redisStore.ttl(key));
    const resolvedPromiseTTL = await Promise.all(promiseTTL);
    const result = matchingKeys.reduce((acc, curr, idx) => {
      acc.push({
        key: curr,
        ttl: resolvedPromiseTTL[idx],
      });

      return acc;
    }, []);

    return result;
  } catch (e) {
    debug('internalsPageCache find key pattern:', [keyPattern, e]);
  }
}

// this method exists to share the initilization of redisStore/cache-manager-redis-store
// rather than have the same thing duplicated in multiple places
function initializeRedisStore(url) {
  // do a dynamic require here, so that we don't pull redis dependencies
  // into our client-side bundle
  const redisStore = require('cache-manager-redis-store');

  var redisSettings = {
    store: redisStore,
    url: url,
  };

  if (url.startsWith('rediss:')) {
    redisSettings['tls'] = { rejectUnauthorized: false };
  }

  return cacheManager.caching(redisSettings);
}

function getInternalsRedisCache() {
  if (process.env.INTERNALS_PAGE_REDIS_URL) {
    return initializeRedisStore(process.env.INTERNALS_PAGE_REDIS_URL);
  } else {
    debug('no INTERNALS_PAGE_REDIS_URL set');
  }

  return undefined;
}

// returns a redis cache if configured via an env var passed thru getBestAvailableCache call. Otherwise falls
// back to an in-memory cache or undefined
function getBestAvailableCache(url) {
  if (url) {
    return initializeRedisStore(url);
  }
  debug('no REDIS_URL specified, falling back to in-memory cache store');

  return cacheManager.caching({
    store: 'memory',
  });
}

function getWriteCache() {
  // in the event that REDIS_WRITE_URL is not sent fallback to REDIS_URL
  return getBestAvailableCache(
    process.env.REDIS_WRITE_URL || process.env.REDIS_URL
  );
}

function getReadCache() {
  // in the event that REDIS_READ_URL is not sent fallback to REDIS_URL
  return getBestAvailableCache(
    process.env.REDIS_READ_URL || process.env.REDIS_URL
  );
}

// This is for backwards compatibility on some tests
export default function createReadThroughCache() {
  return {
    cacheSet,
    cacheGet,
    cacheGetOrCreate,
    cacheDelete,
    cacheFind,
  };
}
