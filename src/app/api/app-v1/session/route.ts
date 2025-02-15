import uuid4 from 'uuid4';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal App

import { createResponseApi } from '@/libs/axios';
import { redisConnect } from '@/libs/redis';
import type { ApiPromise } from '@/interfaces';

export async function POST(request: NextRequest): ApiPromise {
  const { tenant, currentId, sessExpTime } = await request.json();
  const redisInstance = await redisConnect(tenant);
  const cookieId = { code: '200.00.000', message: 'Process ok', sessionId: '' };
  const sessRegeneration = sessExpTime + 10 > 60 ? 60 : sessExpTime;

  try {
    const sessionData = await redisInstance.hgetall(currentId);
    const expireAt = await redisInstance.ttl(currentId);
    const sessionId = sessionData.sessionId && expireAt > sessRegeneration ? currentId : uuid4();
    sessionData.sessionId = sessionId;
    sessionData.sessExpTime = sessExpTime;
    await redisInstance.hset(sessionId, sessionData);
    await redisInstance.expire(sessionId, sessExpTime + 10);
    cookieId.sessionId = sessionId;

    if (currentId && sessionId !== currentId) {
      await redisInstance.del(currentId);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await redisInstance.quit();
  }

  const respHealth = createResponseApi(cookieId);
  return NextResponse.json(respHealth, { status: 200 });
}
