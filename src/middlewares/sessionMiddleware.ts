import type { NextResponse } from 'next/server';
// Internal app
import { cookieValues } from '@/utils';
import { RequestAxios, Tenant } from '@/interfaces';
import { sessionSetts } from '@/tenants/tenantSettings';
import { headersKey, sessCookieName } from '@/constans';
import { createHttpConfig, manageRequest } from '@/libs/axios';

export async function handleSession(headers: Headers, tenant: Tenant, response: NextResponse) {
  const { sessExpTime } = await sessionSetts(tenant);
  const httpConfig = createHttpConfig({ timeout: 59700, headers });
  httpConfig.headers[headersKey.appTenant] = tenant;

  const requestConfig: RequestAxios = {
    method: 'post',
    pathUrl: '/session',
    dataRequest: { tenant },
    httpConfig,
  };
  const requestType = 'application';
  const { data, status } = await manageRequest(requestConfig, requestType);

  if (status !== 200) {
    console.error(data);
  }

  const cookieSesion = cookieValues({
    name: sessCookieName,
    value: data.sessionId,
    sameSite: 'strict',
    expires: sessExpTime + 10,
  });

  response.cookies.set(cookieSesion);
}
