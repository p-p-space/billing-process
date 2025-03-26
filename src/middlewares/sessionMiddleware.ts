import type { NextResponse } from 'next/server';
// Internal app
import { createHttpConfig } from '@/libs/http';
import { applicationRequest } from '@/libs/fetch';
import { HttpRequest, Tenant } from '@/interfaces';
import { cookieValues, sisseionId } from '@/utils';
import { sessionSetts } from '@/tenants/tenantSettings';
import { headersKey, sessCookieName } from '@/constans';

export async function handleSession(tenant: Tenant, response: NextResponse) {
  const { sessExpTime } = await sessionSetts(tenant);
  const httpConfig = createHttpConfig({ timeout: 59700 });
  httpConfig.headers[headersKey.appTenant] = tenant;
  const sessionId = await sisseionId();

  const httpRequest: HttpRequest = {
    method: 'post',
    pathUrl: '/session',
    dataRequest: { tenant, sessionId },
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
