import { NextRequest, NextResponse } from 'next/server';
// Internal app
import { DataRequest } from '@/interfaces';
import { jwePrivateKey, jwePublicKey, jwsPrivateKey, jwsPublicKey } from './constans';
import { createJWT, decryptData, encryptData, signatureData, verifyJWE, verifyJwt } from '@/handlers';

export async function HandleCustomerRequest(request: NextRequest) {
  const { method, nextUrl } = request;
  const { pathname, origin } = nextUrl;
  let decrypt = undefined;
  const data = await request.json();

  if (data) {
    const { payload } = data;

    const verifySignature = await verifyJWE(payload, jwsPublicKey);
    decrypt = await decryptData(verifySignature, jwePrivateKey);
    const jwt = await createJWT(decrypt, jwsPrivateKey);
    await verifyJwt(jwt, jwsPublicKey);
  }

  const dataRequest = {
    formData: decrypt,
    method,
    url: `${origin}${pathname.replace('/v0/', '/v1/')}`,
  } as DataRequest;

  return await requestApi(dataRequest);
}

async function requestApi({ formData, method, url }: DataRequest) {
  const body = formData ? JSON.stringify(formData) : formData;

  try {
    const response = await fetch(`${url}`, {
      method: method,
      body,
    });

    const { status } = response;
    const data = await response.json();
    let payload = undefined;

    if (data) {
      const encrypt = await encryptData(data, jwePublicKey);
      payload = await signatureData(encrypt, jwsPrivateKey);
    }

    const result = {
      code: '200.00.000',
      message: 'process ok',
      payload,
    };

    return NextResponse.json(result, { status });
  } catch (error) {
    throw new Error(`requestApi error: ${(error as Error).message}`);
  }
}
