/*
MIT License

Copyright (c) 2017 Matthijs Dabroek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import type { Cache, Store, Config } from 'cache-manager';
import {
    createClient,
    createCluster,
    RedisClientOptions,
    RedisClientType,
    RedisClusterOptions,
    RedisClusterType,
  } from 'redis';
import '@redis/client';
import '@redis/bloom';
import '@redis/graph';
import '@redis/json';
import '@redis/search';
import '@redis/time-series';
  
type Clients = RedisClientType | RedisClusterType;
  
export type RedisCache<T extends Clients = RedisClientType> = Cache<
RedisStore<T>
>;
  
type Name<T extends Clients> = T extends RedisClientType
? 'redis'
: T extends RedisClusterType
? 'redis-cluster'
: never;

export interface RedisStore<T extends Clients = RedisClientType> extends Store {
name: Name<T>;
isCacheable: (value: unknown) => boolean;
get client(): T;
}

export class NoCacheableError implements Error {
name = 'NoCacheableError';
constructor(public message: string) {}
}
  
  export const avoidNoCacheable = async <T>(p: Promise<T>) => {
    try {
      return await p;
    } catch (e) {
      if (!(e instanceof NoCacheableError)) throw e;
    }
  };
  
  const getVal = (value: unknown) => JSON.stringify(value) || '"undefined"';
  
  function builder<T extends Clients>(
    redisCache: T,
    name: Name<T>,
    reset: () => Promise<void>,
    keys: (pattern: string) => Promise<string[]>,
    options?: Config,
  ) {
    const isCacheable =
      options?.isCacheable || ((value) => value !== undefined && value !== null);
  
    return {
      async get<T>(key: string) {
        const val = await redisCache.get(key);

        if (val === undefined || val === null) return undefined;
        else return JSON.parse(val) as T;
      },
      async set(key, value, ttl) {
        if (!isCacheable(value))
          throw new NoCacheableError(`"${value}" is not a cacheable value`);
        const t = ttl === undefined ? options?.ttl : ttl;

        if (t !== undefined && t !== 0)
          await redisCache.set(key, getVal(value), { PX: t });
        else await redisCache.set(key, getVal(value));
      },
      async mset(args, ttl) {
        const t = ttl === undefined ? options?.ttl : ttl;

        if (t !== undefined && t !== 0) {
          const multi = redisCache.multi();

          for (const [key, value] of args) {
            if (!isCacheable(value))
              throw new NoCacheableError(
                `"${getVal(value)}" is not a cacheable value`,
              );
            multi.set(key, getVal(value), { PX: t });
          }
          await multi.exec();
        } else
          await redisCache.mSet(
            args.map(([key, value]) => {
              if (!isCacheable(value))
                throw new Error(`"${getVal(value)}" is not a cacheable value`);

              return [key, getVal(value)] as [string, string];
            }),
          );
      },
      mget: (...args) =>
        redisCache
          .mGet(args)
          .then((x) =>
            x.map((x) =>
              x === null || x === undefined
                ? undefined
                : (JSON.parse(x) as unknown),
            ),
          ),
      async mdel(...args) {
        await redisCache.del(args);
      },
      async del(key) {
        await redisCache.del(key);
      },
      ttl: async (key) => redisCache.pTTL(key),
      keys: (pattern = '*') => keys(pattern),
      reset,
      isCacheable,
      name,
      get client() {
        return redisCache;
      },
    } as RedisStore<T>;
  }
  
  // TODO: past instance as option
  export async function redisStore(options?: RedisClientOptions & Config) {
    const redisCache = createClient(options);

    await redisCache.connect();

    redisCache.on('error', () => {
        if (!redisCache.isOpen) {
            redisCache.connect();
        }
    });
  
    return redisInsStore(redisCache as RedisClientType, options);
  }
  
  /**
   * redisCache should be connected
   */
  export function redisInsStore(redisCache: RedisClientType, options?: Config) {
    const reset = async () => {
      await redisCache.flushDb();
    };
    const keys = (pattern: string) => redisCache.keys(pattern);
  
    return builder(redisCache, 'redis', reset, keys, options);
  }
  
  // TODO: coverage
  export async function redisClusterStore(options: RedisClusterOptions & Config) {
    const redisCache = createCluster(options);

    await redisCache.connect();

    redisCache.on('error', () => {
        if (!redisCache.isOpen) {
            redisCache.connect();
        }
    });
  
    return redisClusterInsStore(redisCache, options);
  }
  
  // TODO: coverage
  /**
   * redisCache should be connected
   */
  export function redisClusterInsStore(
    redisCache: RedisClusterType,
    options: RedisClusterOptions & Config,
  ) {
    const reset = async () => {
      await Promise.all(
        redisCache.getMasters().map(async (node) => {
          if (node.client) {
            const client = await node.client;

            await client.flushDb();
          }
        }),
      );
    };
  
    const keys = async (pattern: string) =>
      (
        await Promise.all(
          redisCache.getMasters().map(async (node) => {
            if (node.client) {
              const client = await node.client;

              return await client.keys(pattern);
            }

            return [];
          }),
        )
      ).flat();
  
    return builder(redisCache, 'redis-cluster', reset, keys, options);
  }