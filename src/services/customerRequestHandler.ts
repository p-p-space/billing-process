import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import type { RequestContent } from '@/interfaces';
import { headersKey, apiPaths } from '@/utils/constans';
import { manageAppRequest, createHttpConfig } from '@/libs';

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
  const neededPart = uriPath.split('/')[3];
  let pathUrl = uriPath.replace(apiPaths.servPath, '');
  const httpConfig = createHttpConfig({ headers });
  httpConfig.headers[headersKey.appOriginPath] = pathUrl;

  if (!apiPaths.appApis.includes(neededPart)) {
    pathUrl = `/${apiPaths.servApi}`;
  }

  const requestConfig = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest: undefined,
    httpConfig,
  } as RequestContent;

  if (headers.get(headersKey.appContentSecurity) !== null) {
    requestConfig.dataRequest = await request.json();
  }

  const { status, data } = await manageAppRequest(requestConfig);
  const authJws = data.authJws;
  delete data.authJws;
  const response = NextResponse.json(data, { status });

  response.headers.set(headersKey.appJwsToken, `JWS ${authJws}`);

  return response;
}
