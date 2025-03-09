'use server';

import uuid4 from 'uuid4';
// Internal app
import { Tenant } from '@/interfaces';
import { redisConnect } from '../redis/redisConfig';
import { currenTenant, sisseionId } from '@/utils';
import { sessionSetts } from '@/tenants/tenantSettings';

export async function redisSession(tenant?: Tenant) {
  tenant = tenant ?? (await currenTenant());
  const sessionId = await sisseionId();
  const redisInstance = await redisConnect(tenant);

  return { redisInstance, sessionId, tenant };
}

export async function createRefreshSess(tenant: Tenant) {
  const timePlus = 20;
  const { redisInstance, sessionId: currentId } = await redisSession(tenant);
  const { sessExpTime, sessResetTime = 0 } = await sessionSetts(tenant);

  let sessionId = uuid4();
  let currentTime = Date.now();
  const sessionData = await redisInstance.hgetall(currentId);

  if (sessionData.sessionId) {
    const createdAt = parseInt(sessionData.createdAt ?? '0');
    const sessionAge = (currentTime - createdAt) / 1000;
    sessionId = sessionAge >= sessResetTime ? sessionId : currentId;
    currentTime = sessionId === currentId ? createdAt : currentTime;
  }

  sessionData.sessionId = sessionId;
  sessionData.tenant = tenant;
  sessionData.sessExpTime = `${sessExpTime}`;
  sessionData.createdAt = `${currentTime}`;

  await redisInstance.hset(sessionId, sessionData);
  await redisInstance.expire(sessionId, sessExpTime + timePlus);

  if (currentId && sessionId !== currentId) {
    await redisInstance.del(currentId);
  }

  await redisInstance.quit();

  return sessionId;
}

export async function setSession(sessAttr: Record<string, unknown>) {
  sessAttr.logged = true;

  await setSessAttr(sessAttr);
}

export async function setSessAttr(field: object) {
  const { redisInstance, sessionId } = await redisSession();

  const sessionData = await redisInstance.hset(sessionId, field);
  await redisInstance.quit();

  return sessionData;
}

export async function getSessAttr(name: string) {
  const { redisInstance, sessionId } = await redisSession();

  const sessionData = await redisInstance.hget(sessionId, name);
  await redisInstance.quit();

  return sessionData;
}

export async function deleteSessAttr(list: string[]) {
  const { redisInstance, sessionId } = await redisSession();

  for (const key of list) {
    await redisInstance.hdel(sessionId, key);
  }

  await redisInstance.quit();
}

export async function deleteSess() {
  const { redisInstance, sessionId } = await redisSession();

  await redisInstance.del(sessionId);

  await redisInstance.quit();
}
