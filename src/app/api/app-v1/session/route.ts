import uuid4 from 'uuid4';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal App

import { createResponseApi } from '@/libs/axios';
import { createRedisInstance } from '@/libs/redis';
import type { ApiResponsePromise } from '@/interfaces';
import { selectSettings } from '@/tenants/tenantOptions';

export async function POST(request: NextRequest): ApiResponsePromise {
  const { tenant, currentId } = await request.json();
  let sessionId = uuid4();
  const { redisExp } = await selectSettings(tenant);
  const redisInstance = await createRedisInstance(tenant);

  try {
    const sessionData = await redisInstance.hgetall(currentId);
    const expireAt = await redisInstance.ttl(currentId);
    sessionId = sessionData.sessionId && expireAt > 10 ? currentId : sessionId;
    sessionData.sessionId = sessionId;
    await redisInstance.hset(sessionId, sessionData);
    await redisInstance.expire(sessionId, redisExp + 10);

    if (currentId && sessionId !== currentId) {
      await redisInstance.del(currentId);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await redisInstance.quit();
  }

  const cookieId = { code: '200.00.000', message: 'Process ok', sessionId };

  const respHealth = createResponseApi(cookieId);
  return NextResponse.json(respHealth, { status: 200 });
}
