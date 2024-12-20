import { importPKCS8 } from 'jose';
import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { ServRequest } from '@/interfaces';
import * as jwt from '@/handlers/handleJwt';
import { createJWT, verifyJwt } from '@/handlers';
import {
  webJwePrivateKey,
  jwtAlgs,
  webJwsPrivateKey,
  webKeys,
  appBodyContent,
  pathApp,
  servicesApi,
  jwsToken,
  baseURLs,
  apiVersionServ,
  apiVersionApp,
  appApis,
  appOriginPath,
} from '@/utils/constans';

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
  const pathUrl = urlTransform(originPath);

  try {
    let decrypt = undefined;

    if (headers.get(appBodyContent) !== null) {
      const data = await request.json();
      const { payload } = data;
      const tokenApp = headers.get(jwsToken) ?? '';
      const signedData = jwt.assembleJWS(tokenApp, payload);
      const secretJws = jwt.encode(webKeys.jwsSecString);
      const signatureVerified = await jwt.verifySignature(signedData, secretJws);
      const secretJwe = await importPKCS8(webJwePrivateKey, jwtAlgs.jweAlgRsa);
      decrypt = await jwt.decryptData(signatureVerified, secretJwe);

      // Temporary statements for JWT creation and verification
      const jwtTemp = await createJWT(decrypt, webJwsPrivateKey);
      await verifyJwt(jwtTemp, webKeys.jwsPublicKey);
    }

    const requestConfig = {
      method,
      pathUrl,
      dataRequest: decrypt,
      originPath,
    } as ServRequest;

    return await requestApi(requestConfig);
  } catch (error) {
    return NextResponse.json(
      { code: '500.00.000', message: `customerRequest: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

/**
 * Sends a request to the API with the provided data, encrypts the response,
 * and returns it as a signed JWT.
 *
 * @param {ServRequest} requestConfig - The data request object containing dataRequest, method, and url.
 * @returns {Promise<NextResponse>} - The response from the API or an error response.
 */
async function requestApi({ dataRequest, method, pathUrl, originPath }: ServRequest): Promise<NextResponse> {
  const body = dataRequest ? JSON.stringify(dataRequest) : null;
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  headers.append(appOriginPath, `${originPath}`);
  let authJws = '';

  if (body) {
    headers.append(appBodyContent, 'true');
  }

  try {
    const responseApi = await fetch(pathUrl, { method, body, headers });
    const { status } = responseApi;
    const data = await responseApi.json();

    if (data.payload) {
      const { payload } = data;
      const secretJwe = jwt.encode(webKeys.jweSecString);
      const encrypt = await jwt.encryptData(payload, secretJwe, jwtAlgs.jweAlgSec);
      const secretJws = await importPKCS8(webJwsPrivateKey, jwtAlgs.jwsAlgRsa);
      const signedData = await jwt.signData(encrypt, secretJws, jwtAlgs.jwsAlgRsa);
      authJws = jwt.disassembleJWS(signedData);

      data.payload = encrypt;
    }

    const response = NextResponse.json(data, { status });
    response.headers.set(jwsToken, `JWS ${authJws}`);

    return response;
  } catch (error) {
    return NextResponse.json(
      { code: '500.00.000', message: `requestApi: ${(error as Error).message}` },
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
  let appUrl = `${baseURLs.app}${uriPath.replace(apiVersionServ, apiVersionApp)}`;

  if (!appApis.includes(neededPart)) {
    appUrl = `${baseURLs.app}${pathApp}/${servicesApi}`;
  }

  return appUrl;
}
