import type { NextRequest, NextResponse } from 'next/server';
// Internal app
import { cookieValues } from '@/utils';
import { manageRequest } from '../axios';
import { RequestAxios, Tenant } from '@/interfaces';
import { headersKey, sessionCookieName } from '@/constans';
import { selectSettings } from '@/tenants/tenantOptions';

export async function handleSession(request: NextRequest, response: NextResponse) {
  const { cookies, headers, url } = request;
  const tenant = (headers.get(headersKey.appTenant) as Tenant) ?? url.split('/')[3];
  const currentId = cookies.get(sessionCookieName)?.value;

  const requestConfig: RequestAxios = {
    method: 'post',
    pathUrl: `/session`,
    dataRequest: { tenant, currentId },
  };
  const requestType = 'application';

  const { data } = await manageRequest(requestConfig, requestType);

  const { redisExp } = await selectSettings(tenant);

  const cookieSesion = cookieValues({
    name: sessionCookieName,
    value: data.sessionId,
    sameSite: 'strict',
    expires: redisExp,
  });

  response.cookies.set(cookieSesion);
}
