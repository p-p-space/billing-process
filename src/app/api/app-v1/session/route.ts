import uuid4 from 'uuid4';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { apiRespObject } from '@/constans';
import { redisConnect } from '@/libs/redis';
import type { ApiPromise } from '@/interfaces';

export async function POST(request: NextRequest): ApiPromise {
  const { tenant, currentId, sessExpTime } = await request.json();
  const redisInstance = await redisConnect(tenant);
  const sessRegeneration = sessExpTime + 10 > 60 ? 60 : sessExpTime;
  const signinResp = { ...apiRespObject };
  let status = 200;

  try {
    const sessionData = await redisInstance.hgetall(currentId);
    const expireAt = await redisInstance.ttl(currentId);
    const sessionId = sessionData.sessionId && expireAt > sessRegeneration ? currentId : uuid4();
    sessionData.sessionId = sessionId;
    sessionData.sessExpTime = sessExpTime;
    await redisInstance.hset(sessionId, sessionData);
    await redisInstance.expire(sessionId, sessExpTime + 10);
    signinResp.sessionId = sessionId;

    if (currentId && sessionId !== currentId) {
      await redisInstance.del(currentId);
    }
  } catch (error) {
    status = 500;
    signinResp.code = `${status}.00.00`;
    signinResp.message = `Internal server ${(error as Error).message}`;
  } finally {
    await redisInstance.quit();
  }

  return NextResponse.json(signinResp, { status });
}
