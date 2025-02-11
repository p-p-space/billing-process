import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { createRedisInstance } from '@/libs/redis';
import { cookieValues } from '@/utils';
import { headersKey } from '@/constans';
import uuid4 from 'uuid4';

export async function POST(request: NextRequest) {
  const { cookies, headers, url } = request;
  let currentId = cookies.get('session_id')?.value;
  const redisInstance = await createRedisInstance();

  if (!currentId) {
    currentId = uuid4();
  }

  const dataRequest = {
    currentId,
    nextId: uuid4(),
    tenant: headers.get(headersKey.appTenant) ?? url.split('/')[3],
  };

  const cookieSesion = cookieValues({
    name: 'session_id',
    value: dataRequest.nextId,
    sameSite: 'strict',
    expires: 60,
  });

  try {
    const sessionData = await redisInstance.hgetall(currentId);
    sessionData.sessionId = dataRequest.nextId;
    await redisInstance.hset(dataRequest.nextId, sessionData);
    await redisInstance.expire(dataRequest.nextId, 3600); // Set expiration time as needed
    await redisInstance.del(currentId);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await redisInstance.quit();
  }

  const response = NextResponse.json({ message: 'Session handled' });
  response.cookies.set(cookieSesion);
  return response;
}
