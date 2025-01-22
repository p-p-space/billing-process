import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal App
import { readCookie } from '@/utils';
import { selectSettings } from '@/tenants/tenantOptions';
import { tenantCookieName, headersKey } from '@/constans';
import { createHttpConfig, manageRequest } from '@/libs/axios';
import type { ReqResBody, RequestAxios, Tenant } from '@/interfaces';

const oauthToken: { bearer?: string } = {
  bearer: undefined,
};

export async function connectServices(request: NextRequest) {
  const { headers, method } = request;
  const pathUrl = headers.get(headersKey.appOriginPath);
  const reqId = headers.get(headersKey.AppReqId);
  const { tenantId } = await appCreedentials();

  if (!oauthToken.bearer) {
    const responseBearer = await getOauthBearer();

    if (!responseBearer.ok) {
      return responseBearer;
    }
  }

  const { bearer } = oauthToken;
  const httpConfig = createHttpConfig({ timeout: 59500 });
  httpConfig.headers[headersKey.authorization] = `Bearer ${bearer}`;
  httpConfig.headers[headersKey.servTenantId] = tenantId;
  httpConfig.headers[headersKey.servReqId] = `${reqId}`;
  let dataRequest = undefined;

  if (headers.get(headersKey.appContentSecurity) !== null) {
    dataRequest = await request.json();
    httpConfig.headers[headersKey.appContentSecurity] = 'enc';
  }

  const requestConfig = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest,
    httpConfig,
  } as RequestAxios;
  const requestType = 'services';
  const { status, data } = await manageRequest(requestConfig, requestType);

  return NextResponse.json(data, { status });
}

export async function getOauthBearer() {
  const { clientId, clientSecret } = await appCreedentials();
  const dataRequest: ReqResBody = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  };

  const httpConfig = createHttpConfig({ timeout: 59600 });
  httpConfig.headers[headersKey.contentType] = 'application/x-www-form-urlencoded';

  const requestConfig = {
    method: 'post',
    pathUrl: `/oauth2/v1/token`,
    dataRequest,
    httpConfig,
  } as RequestAxios;
  const requestType = 'services';

  const { data, status } = await manageRequest(requestConfig, requestType);

  if (status === 200) {
    oauthToken.bearer = data.access_token;

    setTimeout(() => {
      oauthToken.bearer = undefined;
    }, data.expires_in * 1000 - 5000);

    return NextResponse.next();
  }

  return NextResponse.json(data, { status });
}

export async function appCreedentials() {
  const tenant = (await readCookie(tenantCookieName)) as Tenant;

  const credentials = await selectSettings(tenant);

  return {
    clientId: credentials.tenantClientId,
    clientSecret: credentials.tenantClientSecret,
    tenantId: credentials.tenantId,
  };
}
