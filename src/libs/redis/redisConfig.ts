import Redis from 'ioredis';
import type { RedisOptions } from 'ioredis';
// Internal app
import { Tenant } from '@/interfaces';
import { redisSetts } from '@/tenants/tenantSettings';

export async function redisConnect(tenant: Tenant): Promise<Redis> {
  const { host, port, db, username, password, keyPrefix, tls } = await redisSetts(tenant);

  const redisOptions: RedisOptions = {
    host,
    port,
    db,
    username,
    password,
    keyPrefix,
    lazyConnect: true,
    showFriendlyErrorStack: true,
    enableAutoPipelining: true,
    maxRetriesPerRequest: 1,
    tls,
  };

  const redisInstance = new Redis(redisOptions);

  redisInstance.on('connect', () => {});

  redisInstance.on('error', (error) => {
    console.error(`Redis connection: ${error.message}`);
  });

  redisInstance.on('close', () => {});

  redisInstance.on('end', () => {});

  redisInstance.on('reconnecting', () => {});

  return redisInstance;
}
