import type { NextRequest, NextResponse } from 'next/server';
// Internal app
import { cookieValues } from '@/utils';
import { manageRequest } from '../axios';
import { RequestAxios, Tenant } from '@/interfaces';
import { headersKey } from '@/constans';
import { selectSettings } from '@/tenants/tenantOptions';

export async function handleSession(request: NextRequest, response: NextResponse) {
  const { cookies, headers, url } = request;
  const tenant = (headers.get(headersKey.appTenant) as Tenant) ?? url.split('/')[3];
  const { sessExpTime, sessCookieName } = await selectSettings(tenant);
  const currentId = cookies.get(`${sessCookieName}${tenant}`)?.value;

  const requestConfig: RequestAxios = {
    method: 'post',
    pathUrl: `/session`,
    dataRequest: { tenant, currentId },
  };
  const requestType = 'application';

  const { data } = await manageRequest(requestConfig, requestType);

  const cookieSesion = cookieValues({
    name: `${sessCookieName}${tenant}`,
    value: data.sessionId,
    sameSite: 'strict',
    expires: sessExpTime + 5,
  });

  response.cookies.set(cookieSesion);
}
