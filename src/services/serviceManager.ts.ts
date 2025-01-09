import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal App
import { headersKey } from '@/constants';
import { creds } from '@/utils/constans';
import { createHttpConfig, manageRequest } from '@/libs';
import type { ReqResBody, RequestContent } from '@/interfaces';

const oauthToken: { bearer?: string } = {
  bearer: undefined,
};

export async function connectServices(request: NextRequest) {
  const { headers, method } = request;
  const pathUrl = headers.get(headersKey.appOriginPath);

  if (!oauthToken.bearer) {
    const responseBearer = await getOauthBearer();

    if (!responseBearer.ok) {
      return responseBearer;
    }
  }

  const { bearer } = oauthToken;
  const httpConfig = createHttpConfig({ timeout: 59500 });
  httpConfig.headers[headersKey.authorization] = `Bearer ${bearer}`;
  httpConfig.headers[headersKey.servTenantId] = creds.tenantId;
  httpConfig.headers[headersKey.servReqId] = 'e30b625a-e085-42a5-aac2-3d52f73ad8fe';
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
  } as RequestContent;
  const requestType = 'services';
  const { status, data } = await manageRequest(requestConfig, requestType);

  return NextResponse.json(data, { status });
}

export async function getOauthBearer() {
  const dataRequest: ReqResBody = {
    grant_type: 'client_credentials',
    client_id: creds.key,
    client_secret: creds.secret,
  };

  const httpConfig = createHttpConfig({ timeout: 59600 });
  httpConfig.headers[headersKey.contentType] = 'application/x-www-form-urlencoded';

  const requestConfig = {
    method: 'post',
    pathUrl: `/oauth2/v1/token`,
    dataRequest,
    httpConfig,
  } as RequestContent;
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
