import Redis from 'ioredis';
import type { RedisOptions } from 'ioredis';
// Internal App
import { Tenant } from '@/interfaces';
import { selectSettings } from '@/tenants/tenantOptions';

export async function createRedisInstance(tenantUrl?: Tenant): Promise<Redis> {
  const { redisHost, redisPort, redisDb, redisSsl, redisUser, redisPassword, redisPrefix } = await selectSettings(
    tenantUrl
  );

  const redisOptions: RedisOptions = {
    host: redisHost,
    port: redisPort,
    db: redisDb,
    username: redisUser,
    password: redisPassword,
    keyPrefix: `${redisPrefix}:`,
    lazyConnect: true,
    showFriendlyErrorStack: true,
    enableAutoPipelining: false,
    maxRetriesPerRequest: 1,
    tls: redisSsl === 'ON' ? { rejectUnauthorized: false } : undefined,
  };

  const redisInstance = new Redis(redisOptions);

  redisInstance.on('connect', () => {
    console.log('Redis connected');
  });

  redisInstance.on('error', (error) => {
    console.error(`Redis connection: ${error.message}`);
  });

  redisInstance.on('close', () => {
    console.log('Redis closed');
  });

  redisInstance.on('reconnecting', () => {
    console.log('Redis');
  });

  redisInstance.on('end', () => {
    console.log('Redis ended');
  });

  return redisInstance;
}

export async function redisExcute() {
  const redisInstance = await createRedisInstance();

  const set = async (key: string, value: string) => {
    const result = await redisInstance.set(key, value);

    return result;
  };

  const get = async (key: string) => {
    const result = await redisInstance.get(key);

    return result;
  };

  const hset = async (key: string, field: object) => {
    const result = await redisInstance.hset(key, field);

    return result;
  };

  const hget = async (key: string, field: string) => {
    const result = await redisInstance.hget(key, field);

    return result;
  };

  const hgetall = async (key: string) => {
    const result = await redisInstance.hgetall(key);

    return result;
  };

  const zadd = async (key: string, score: number, member: string) => {
    const result = await redisInstance.zadd(key, 'NX', score, member);

    return result;
  };

  const zrange = async (key: string, start: number, stop: number) => {
    const result = (await redisInstance.zrange(key, start, stop, 'WITHSCORES')).filter((_, index) => index % 2 !== 0);

    return result;
  };

  return { set, get, hset, hget, hgetall, zadd, zrange };
}
