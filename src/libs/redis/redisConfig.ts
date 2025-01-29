import Redis from 'ioredis';
import type { RedisOptions } from 'ioredis';
// Internal App
import { selectSettings } from '@/tenants/tenantOptions';

export async function createRedisInstance() {
  const { redisHost, redisPort, redisDb, redisSsl, redisUser, redisPassword, redisPrefix } = await selectSettings();

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
    console.log('Conectado a Redis');
  });

  redisInstance.on('error', (error) => {
    console.error(`Redis conección error: ${error.message}`);
  });

  redisInstance.on('close', () => {
    console.log('Conexión cerrada a Redis');
  });

  redisInstance.on('reconnecting', () => {
    console.log('Reconectando a Redis');
  });

  redisInstance.on('end', () => {
    console.log('Conexión finalizada a Redis');
  });

  return redisInstance;
}

type RedisAction = 'set' | 'get' | 'del' | 'hset' | 'hget' | 'lpush' | 'lpop' | 'sadd' | 'smembers';

/**
 * Ejecuta una acción con Redis y cierra la conexión de manera ordenada.
 *
 * @param {RedisAction} action - La acción a ejecutar ('set', 'get', 'del', 'hset', 'hget', 'lpush', 'lpop', 'sadd', 'smembers').
 * @param {string} key - La clave para la acción de Redis.
 * @param {string | string[]} [value] - El valor para la acción de Redis (solo para 'set', 'hset', 'lpush', 'sadd').
 
 */
export async function redisActions(
  action: RedisAction,
  key: string,
  value?: string | string[]
): Promise<string | number | string[] | null> {
  const redisInstance = await createRedisInstance();

  try {
    let result;
    switch (action) {
      case 'set':
        if (typeof value !== 'string') {
          throw new Error('Value must be a string for set action');
        }
        result = await redisInstance.set(key, value);
        break;
      case 'get':
        result = await redisInstance.get(key);
        break;
      case 'del':
        result = await redisInstance.del(key);
        break;
      case 'hset':
        if (typeof value !== 'string') {
          throw new Error('Value must be a string for hset action');
        }
        result = await redisInstance.hset(key, value);
        break;
      case 'hget':
        result = await redisInstance.hget(key, value as string);
        break;
      case 'lpush':
        if (!Array.isArray(value)) {
          throw new Error('Value must be an array of strings for lpush action');
        }
        result = await redisInstance.lpush(key, ...value);
        break;
      case 'lpop':
        result = await redisInstance.lpop(key);
        break;
      case 'sadd':
        if (!Array.isArray(value)) {
          throw new Error('Value must be an array of strings for sadd action');
        }
        result = await redisInstance.sadd(key, ...value);
        break;
      case 'smembers':
        result = await redisInstance.smembers(key);
        break;
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
    console.log({ result });
    return result;
  } catch (error) {
    console.error(`Redis action: ${(error as Error).message}`);
    throw error;
  } finally {
    await redisInstance.expire(key, 185);
    await redisInstance.quit();
  }
}
