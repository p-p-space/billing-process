import { importPKCS8 } from 'jose';
import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { DataRequest } from '@/interfaces';
import * as jwt from '@/handlers/handleJwt';
import { createJWT, verifyJwt } from '@/handlers';
import {
  jwsSecretString,
  jwePrivateKey,
  rsaAlgJwe,
  jwsPrivateKey,
  jwsPublicKey,
  jweSecretString,
  JweAlgSec,
  jwsAlgRsa,
  encode,
  bodyContent,
  originalPath,
  pathServ,
  appApis,
  apiVersionServ,
  apiVersionApp,
  pathApp,
  servicesApi,
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
    const originalPathUrl = headers.get(originalPath);
    const apiUrl = urlTransform(originalPathUrl, pathname, search);
    let decrypt = undefined;

    if (headers.get(bodyContent) !== null) {
      const data = await request.json();
      const { payload } = data;
      const secretJws = encode(jwsSecretString);
      const signatureVerified = await jwt.verifySignature(payload, secretJws);
      const secretJwe = await importPKCS8(jwePrivateKey, rsaAlgJwe);
      decrypt = await jwt.decryptData(signatureVerified, secretJwe);

      // Temporary statements for JWT creation and verification
      const jwtTemp = await createJWT(decrypt, jwsPrivateKey);
      await verifyJwt(jwtTemp, jwsPublicKey);
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
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  if (body) {
    headers.append(bodyContent, 'true');
  }

  try {
    const response = await fetch(`${url}`, {
      method,
      body,
      headers,
    });
    const { status } = response;
    const data = await response.json();

    if (data.payload) {
      const { payload } = data;
      const secretJwe = encode(jweSecretString);
      const encrypt = await jwt.encryptData(payload, secretJwe, JweAlgSec);
      const secretJws = await importPKCS8(jwsPrivateKey, jwsAlgRsa);
      data.payload = await jwt.signData(encrypt, secretJws, jwsAlgRsa);
    }

    return NextResponse.json(data, { status });
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
