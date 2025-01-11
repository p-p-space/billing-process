import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import type { RequestContent } from '@/interfaces';
import { createHttpConfig, manageRequest } from '@/libs';
import { apiPaths, apiVersions, headersKey } from '@/constans';

/**
 * Handles customer requests by processing the incoming request, configuring the HTTP request,
 * and managing the application request.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object.
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
export async function handleCustomerRequest(request: NextRequest): Promise<NextResponse> {
  const { headers, method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const uriPath = `${pathname}${search}`;
  const apiApp = uriPath.split('/')[3];
  let pathUrl = uriPath.replace(apiVersions.apiSearch, '/');
  const httpConfig = createHttpConfig({ timeout: 59700, headers });
  httpConfig.headers[headersKey.appOriginPath] = uriPath;

  if (!apiPaths.appApis.includes(apiApp)) {
    pathUrl = `/${apiPaths.appServApi}`;
  }

  const requestConfig = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest: undefined,
    httpConfig,
  } as RequestContent;
  const requestType = 'application';

  if (headers.get(headersKey.appContentSecurity) !== null) {
    requestConfig.dataRequest = await request.json();
  }

  const { status, data } = await manageRequest(requestConfig, requestType);

  const authJws = data.authJws;
  delete data.authJws;
  const response = NextResponse.json(data, { status });

  response.headers.set(headersKey.appJwsToken, `JWS ${authJws}`);

  return response;
}
