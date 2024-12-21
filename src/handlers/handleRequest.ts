import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { RequestContent } from '@/interfaces';
import manageAppRequest from '@/libs/appAxiosConfig';
import { createHttpConfig } from '@/utils/toolHelpers';
import { baseURLs, headersKey, apiVersions, apiPaths } from '@/utils/constans';

/**
 * Handles customer requests by verifying and decrypting the payload,
 * and forwarding the request to the API.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response from the API or an error response.
 */
export async function customerRequest(request: NextRequest): Promise<NextResponse> {
  const { headers, method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const originPath = `${pathname}${search}`;
  const httpConfig = createHttpConfig({ headers });
  const pathUrl = urlTransform(originPath);

  httpConfig.headers[headersKey.appOriginPath] = originPath;

  const requestConfig = {
    method: method.toLowerCase(),
    pathUrl,
    dataRequest: undefined,
    httpConfig,
  } as RequestContent;

  try {
    if (headers.get(headersKey.appContentSecurity) !== null) {
      requestConfig.dataRequest = await request.json();
    }

    const { status, data } = await manageAppRequest(requestConfig);
    const authJws = data.authJws;
    delete data.authJws;
    const response = NextResponse.json(data, { status });

    response.headers.set(headersKey.appJwsToken, `JWS ${authJws}`);

    return response;
  } catch (error) {
    return NextResponse.json(
      { code: '500.00.000', message: `customerRequest: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

/**
 * Transforms the URL based on the provided path and search parameters.
 *
 * @param {string} uriPath - The pathname from the request URL.
 * @returns {string} - The transformed URL.
 */
function urlTransform(uriPath: string): string {
  const neededPart = uriPath.split('/')[3];
  let appUrl = `${baseURLs.app}${uriPath.replace(apiVersions.serv, apiVersions.app)}`;

  if (!apiPaths.appApis.includes(neededPart)) {
    appUrl = `${baseURLs.app}${apiPaths.appPath}/${apiPaths.servApi}`;
  }

  return appUrl;
}
