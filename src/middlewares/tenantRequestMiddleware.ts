import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { setCookie } from '@/utils';
import { createHttpConfig } from '@/libs/http';
import { applicationRequest } from '@/libs/fetch';
import { apiPaths, headersKey } from '@/constans';
import type { ApiPromise, HttpRequest } from '@/interfaces';

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

  const httpRequest = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest: undefined,
    httpConfig,
  } as HttpRequest;

  if (headers.get(headersKey.appContentSecurity) !== null) {
    httpRequest.dataRequest = await request.json();
  }

  const { data, status } = await applicationRequest(httpRequest);

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
