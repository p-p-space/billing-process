import type { NextRequest, NextResponse } from 'next/server';
// Internal app
import { cookieValues } from '@/utils';
import { headersKey } from '@/constans';
import { manageRequest } from '../axios';
import { RequestAxios, Tenant } from '@/interfaces';
import { sessionSetts } from '@/tenants/tenantSettings';

export async function handleSession(request: NextRequest, response: NextResponse) {
  const { cookies, headers, url } = request;
  const tenant = (headers.get(headersKey.appTenant) ?? url.split('/')[3]) as Tenant;
  const { sessExpTime, sessCookieName } = await sessionSetts(tenant);
  const currentId = cookies.get(sessCookieName)?.value;

  const requestConfig: RequestAxios = {
    method: 'post',
    pathUrl: '/session',
    dataRequest: { tenant, currentId, sessExpTime },
  };
  const requestType = 'application';

  const { data } = await manageRequest(requestConfig, requestType);

  const cookieSesion = cookieValues({
    name: sessCookieName,
    value: data.sessionId,
    sameSite: 'strict',
    expires: sessExpTime + 5,
  });

  response.cookies.set(cookieSesion);
}
