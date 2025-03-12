import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { headersKey } from '@/constans';
import { manageRequest } from '@/libs/axios';
import { createHttpConfig } from '@/libs/http';
import { appCredSetts } from '@/tenants/tenantSettings';
import type { ApiPromise, ReqResBody, HttpRequest } from '@/interfaces';

const oauthToken: { bearer: string | null } = {
  bearer: null,
};

export async function connectServices(request: NextRequest): ApiPromise {
  const { headers, method } = request;
  const pathUrl = headers.get(headersKey.appOriginPath);
  const reqId = headers.get(headersKey.AppReqId);
  const { tenantId } = await appCredSetts();

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
  }

  const httpRequest = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest,
    httpConfig,
  } as HttpRequest;
  const requestType = 'services';
  const { status, data } = await manageRequest(httpRequest, requestType);

  return NextResponse.json(data, { status });
}

export async function getOauthBearer() {
  const { clientId, clientSecret } = await appCredSetts();
  const dataRequest: ReqResBody = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  };

  const httpConfig = createHttpConfig({ timeout: 59600 });
  httpConfig.headers[headersKey.contentType] = 'application/x-www-form-urlencoded';

  const httpRequest = {
    method: 'post',
    pathUrl: '/oauth2/v1/token',
    dataRequest,
    httpConfig,
  } as HttpRequest;
  const requestType = 'services';

  const { data, status } = await manageRequest(httpRequest, requestType);

  if (status === 200) {
    oauthToken.bearer = data.access_token;

    setTimeout(() => {
      oauthToken.bearer = null;
    }, data.expires_in * 1000 - 5000);

    return NextResponse.next();
  }

  return NextResponse.json(data, { status });
}
