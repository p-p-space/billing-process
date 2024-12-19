import { type NextRequest, NextResponse } from 'next/server';
// Internal App
import { appBodyContent, appOriginPath, credentialsKey, credentialsSecret, tenantId } from '@/utils/constans';
import { manageServerRequest } from './handleServerRequest';
import { AxiosConfig, RequestBody, ServRequest } from '@/interfaces';

const serverTimeOut = 59650;
const status = 200;
const response: { code: string; message: string; payload: undefined | object; error: undefined | string | object } = {
  code: '',
  message: '',
  payload: {
    user: {
      id: 12345,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
    },
  },
  error: undefined,
};

export async function managerCoreServices(request: NextRequest) {
  const { headers, method } = request;
  const oauthToken = await getOauthBearer();
  const pathUrl = headers.get(appOriginPath);
  let dataRequest = undefined;

  if (headers.get(appBodyContent) !== null) {
    dataRequest = await request.json();
    dataRequest['way'] = 'core';
  }

  const axiosConfig: AxiosConfig = {
    timeout: serverTimeOut,
    headers: {
      Authorization: `Bearer ${oauthToken}`,
      'Content-Type': 'application/json',
      'X-Request-Id': 'e30b625a-e085-42a5-aac2-3d52f73ad8fe',
      'X-Tenant-Id': tenantId,
    },
  };

  const requestConfig = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest,
    axiosConfig,
  } as ServRequest;

  const data = await manageServerRequest(requestConfig);
  console.log(data);

  return NextResponse.json(response, { status });
}

export async function getOauthBearer() {
  let bearer = null;

  if (!bearer) {
    const dataRequest: RequestBody = {
      grant_type: 'client_credentials',
      client_id: credentialsKey,
      client_secret: credentialsSecret,
      way: 'server',
    };
    const axiosConfig: AxiosConfig = {
      timeout: serverTimeOut,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const requestConfig = {
      method: 'post',
      pathUrl: `/oauth2/v1/token`,
      dataRequest,
      axiosConfig,
    } as ServRequest;

    const data = await manageServerRequest(requestConfig);

    bearer = data.access_token;
  }

  return bearer;
}
