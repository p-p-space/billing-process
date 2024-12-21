import { type NextRequest, NextResponse } from 'next/server';
// Internal App
import { manageServicesRequest } from '@/libs';
import { RequestBody, RequestContent } from '@/interfaces';
import { creds, headersKey } from '@/utils/constans';
import { createHttpConfig } from '@/utils/toolHelpers';

export async function managerCoreServices(request: NextRequest) {
  const { headers, method } = request;
  const oauthToken = await getOauthBearer();
  const pathUrl = headers.get(headersKey.appOriginPath);
  let dataRequest = undefined;

  if (headers.get(headersKey.appContentSecurity) !== null) {
    dataRequest = await request.json();
  }

  const httpConfig = createHttpConfig({ timeout: 59700, headers });
  httpConfig.headers[headersKey.authorization] = `Bearer ${oauthToken}`;
  httpConfig.headers[headersKey.servTenantId] = creds.tenantId;
  httpConfig.headers[headersKey.servReqId] = 'e30b625a-e085-42a5-aac2-3d52f73ad8fe';

  const requestConfig = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest,
    httpConfig,
  } as RequestContent;

  const { status, data } = await manageServicesRequest(requestConfig);

  return NextResponse.json(data, { status });
}

export async function getOauthBearer() {
  let bearer = null;

  if (!bearer) {
    const dataRequest: RequestBody = {
      grant_type: 'client_credentials',
      client_id: creds.key,
      client_secret: creds.secret,
    };

    const httpConfig = createHttpConfig({ timeout: 59750 });
    httpConfig.headers[headersKey.contentType] = 'application/x-www-form-urlencoded';

    const requestConfig = {
      method: 'post',
      pathUrl: `/oauth2/v1/token`,
      dataRequest,
      httpConfig,
    } as RequestContent;

    const { data } = await manageServicesRequest(requestConfig);

    bearer = data.access_token;
  }

  return bearer;
}
