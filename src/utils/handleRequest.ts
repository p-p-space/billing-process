import { importPKCS8 } from 'jose';
import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { DataRequest } from '@/interfaces';
import * as jwt from '@/handlers/handleJwt';
import { createJWT, verifyJwt } from '@/handlers';
import {
  encode,
  rsaAlgJwe,
  JweAlgSec,
  jwePrivateKey,
  jwsAlgRsa,
  jwsPrivateKey,
  jwsPublicKey,
  jweSecretString,
  jwsSecretString,
} from './constans';

/**
 * Handles customer requests by verifying and decrypting the payload,
 * and forwarding the request to the API.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response from the API or an error response.
 */
export async function customerRequest(request: NextRequest): Promise<NextResponse> {
  const { method, nextUrl } = request;
  const { pathname, origin } = nextUrl;
  let decrypt = undefined;

  try {
    const data = await request.json();
    const { payload } = data;
    const secretJws = encode(jwsSecretString);
    const signatureVerified = await jwt.verifySignature(payload, secretJws);
    const secretJwe = await importPKCS8(jwePrivateKey, rsaAlgJwe);
    decrypt = await jwt.decryptData(signatureVerified, secretJwe);

    // Temporary statements for JWT creation and verification
    const jwtTemp = await createJWT(decrypt, jwsPrivateKey);
    await verifyJwt(jwtTemp, jwsPublicKey);

    const dataRequest = {
      formData: decrypt,
      method,
      url: `${origin}${pathname.replace('/v0/', '/v1/')}`,
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

  try {
    const response = await fetch(`${url}`, {
      method,
      body,
    });
    const { status } = response;
    const data = await response.json();
    let payload = undefined;

    if (data) {
      const secretJwe = encode(jweSecretString);
      const encrypt = await jwt.encryptData(data, secretJwe, JweAlgSec);
      const secretJws = await importPKCS8(jwsPrivateKey, jwsAlgRsa);
      payload = await jwt.signData(encrypt, secretJws, jwsAlgRsa);
    }

    const result = {
      code: '200.00.000',
      message: 'process ok',
      payload,
    };

    return NextResponse.json(result, { status });
  } catch (error) {
    return NextResponse.json(
      { code: '500.00.000', message: `requestApi: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
