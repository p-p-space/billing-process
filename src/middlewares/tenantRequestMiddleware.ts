import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { setCookie } from '@/utils';
import { apiPaths, headersKey } from '@/constans';
import type { ApiPromise, RequestAxios } from '@/interfaces';
import { createHttpConfig, manageRequest } from '@/libs/axios';

/**
 * Handles customer requests by processing the incoming request, configuring the HTTP request,
 * and managing the application request.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {ApiPromise} - A promise that resolves to the response object.
 *
 * @remarks
 * This function performs the following steps:
 * 1. Extracts headers, method, and URL information from the request.
 * 2. Constructs the URI path and determines the needed part of the path.
 * 3. Configures the HTTP request headers and path URL.
 * 4. Checks if the needed part of the path is included in the application APIs.
 * 5. If the content security header is present, parses the request body as JSON.
 * 6. Manages the application request and processes the response.
 * 7. Sets the authorization JWS token in the response headers.
 */
export async function handleCustomerRequest(request: NextRequest): ApiPromise {
  const { headers, method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const uriPath = `${pathname}${search}`;
  let pathUrl = uriPath.replace(apiPaths.apiSearch, '/');
  const httpConfig = createHttpConfig({ timeout: 59700, headers });
  httpConfig.headers[headersKey.appOriginPath] = uriPath;

  if (!pathname.includes(apiPaths.appBrowserApi)) {
    pathUrl = apiPaths.appApiServ;
  }

  const requestConfig = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest: undefined,
    httpConfig,
  } as RequestAxios;
  const requestType = 'application';

  if (headers.get(headersKey.appContentSecurity) !== null) {
    requestConfig.dataRequest = await request.json();
  }

  const { status, data } = await manageRequest(requestConfig, requestType);

  const authJws = data.authJws;
  delete data.authJws;

  if (data.cookies) {
    for (const cookie of data.cookies) {
      await setCookie(cookie);
    }

    delete data.cookies;
  }

  const customerResp = NextResponse.json(data, { status });

  if (data.payload) {
    customerResp.headers.set(headersKey.appJwsToken, `JWS ${authJws}`);
  }

  return customerResp;
}
