import type { NextResponse } from 'next/server';
// Internal app
import { cookieValues } from '@/utils';
import { createHttpConfig } from '@/libs/http';
import { applicationRequest } from '@/libs/fetch';
import { HttpRequest, Tenant } from '@/interfaces';
import { sessionSetts } from '@/tenants/tenantSettings';
import { headersKey, sessCookieName } from '@/constans';

export async function handleSession(headers: Headers, tenant: Tenant, response: NextResponse) {
  const { sessExpTime } = await sessionSetts(tenant);
  const httpConfig = createHttpConfig({ timeout: 59700, headers });
  httpConfig.headers[headersKey.appTenant] = tenant;

  const httpRequest: HttpRequest = {
    method: 'post',
    pathUrl: '/session',
    dataRequest: { tenant },
    httpConfig,
  };

  const { data, status } = await applicationRequest(httpRequest);

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
