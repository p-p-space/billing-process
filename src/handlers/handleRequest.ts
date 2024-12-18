import { importPKCS8 } from 'jose';
import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { DataRequest } from '@/interfaces';
import * as jwt from '@/handlers/handleJwt';
import { createJWT, verifyJwt } from '@/handlers';
import {
  webJwsSecretString,
  webJwePrivateKey,
  rsaAlgJwe,
  webJwsPrivateKey,
  webJwsPublicKey,
  webJweSecretString,
  JweAlgSec,
  jwsAlgRsa,
  bodyContent,
  originPath,
  pathServ,
  appApis,
  apiVersionServ,
  apiVersionApp,
  pathApp,
  servicesApi,
  jwsToken,
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
  const { pathname, origin, search } = nextUrl;

  try {
    const originalPathUrl = headers.get(originPath);
    const apiUrl = urlTransform(originalPathUrl, pathname, search);
    let decrypt = undefined;

    if (headers.get(bodyContent) !== null) {
      const data = await request.json();
      const { payload } = data;
      const tokenApp = headers.get(jwsToken) ?? '';
      const signedData = jwt.assembleJWS(tokenApp, payload);
      const secretJws = jwt.encode(webJwsSecretString);
      const signatureVerified = await jwt.verifySignature(signedData, secretJws);
      const secretJwe = await importPKCS8(webJwePrivateKey, rsaAlgJwe);
      decrypt = await jwt.decryptData(signatureVerified, secretJwe);

      // Temporary statements for JWT creation and verification
      const jwtTemp = await createJWT(decrypt, webJwsPrivateKey);
      await verifyJwt(jwtTemp, webJwsPublicKey);
    }

    const dataRequest = {
      formData: decrypt,
      method,
      url: `${origin}${apiUrl}`,
    } as DataRequest;

    return await requestApi(dataRequest);
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
 * @param {DataRequest} dataRequest - The data request object containing formData, method, and url.
 * @returns {Promise<NextResponse>} - The response from the API or an error response.
 */
async function requestApi({ formData, method, url }: DataRequest): Promise<NextResponse> {
  const body = formData ? JSON.stringify(formData) : formData;
  const headers = new Headers();
  let authJws = '';
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  if (body) {
    headers.append(bodyContent, 'true');
  }

  try {
    const responseApi = await fetch(`${url}`, {
      method,
      body,
      headers,
    });
    const { status } = responseApi;
    const data = await responseApi.json();

    if (data.payload) {
      const { payload } = data;
      const secretJwe = jwt.encode(webJweSecretString);
      const encrypt = await jwt.encryptData(payload, secretJwe, JweAlgSec);
      const secretJws = await importPKCS8(webJwsPrivateKey, jwsAlgRsa);
      const signedData = await jwt.signData(encrypt, secretJws, jwsAlgRsa);
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

function urlTransform(pathUrl: string | null, pathname: string, search: string): string {
  const headerRequest = `/${pathServ}/${pathUrl}`;
  const originRequest = `${pathname}${search}`;
  const searchPath = pathname.split('/')[3];
  let appUrl = pathname.replace(`/${apiVersionServ}/`, `/${apiVersionApp}/`);

  if (headerRequest !== originRequest) {
    throw new Error(`urlTransform: The transformed URL does not match the expected format.`);
  }

  if (!appApis.includes(searchPath)) {
    appUrl = originRequest.replace(`${pathServ}/${searchPath}`, `${pathApp}/${servicesApi}`);
  }

  return appUrl;
}
