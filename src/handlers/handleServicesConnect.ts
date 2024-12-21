import { type NextRequest, NextResponse } from 'next/server';
// Internal App
import { baseURLs, creds, headersKey } from '@/utils/constans';
import { createHttpConfig } from '@/utils/toolHelpers';
import manageServicesRequest from '@/libs/servAxiosConfig';
import { RequestBody, RequestContent } from '@/interfaces';

const oauthToken: { bearer?: string } = {
  bearer: undefined,
};

export async function managerCoreServices(request: NextRequest) {
  const { headers, method } = request;
  const pathUrl = headers.get(headersKey.appOriginPath);
  const bearer = await getOauthBearer();
  let dataRequest = undefined;

  if (headers.get(headersKey.appContentSecurity) !== null) {
    dataRequest = await request.json();
  }

  const httpConfig = createHttpConfig({ timeout: 59700 });
  httpConfig.headers[headersKey.authorization] = `Bearer ${bearer}`;
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
  const { bearer } = oauthToken;

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
      pathUrl: `${baseURLs.serv}/oauth2/v1/token`,
      dataRequest,
      httpConfig,
    } as RequestContent;

    const { data } = await manageServicesRequest(requestConfig);
    console.log({ data });
    oauthToken.bearer = data.access_token;

    setTimeout(() => {
      oauthToken.bearer = undefined;
    }, data.expires_in * 1000 - 5000);
  }

  return oauthToken.bearer;
}
