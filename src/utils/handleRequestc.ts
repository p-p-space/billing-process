import { NextRequest, NextResponse } from 'next/server';
// Internal app
import { DataRequest } from '@/interfaces';
import * as jwt from '@/handlers/handleJwt';
import {
  encode,
  JweAlgRsa,
  JweAlgSec,
  jwePrivateKey,
  jwsAlgRsa,
  jwsPrivateKey,
  jwsPublicKey,
  SecretJwe,
  SecretJws,
} from './constans';
import { createJWT, verifyJwt } from '@/handlers';
import { importPKCS8 } from 'jose';

export async function customerRequest(request: NextRequest) {
  const { method, nextUrl } = request;
  const { pathname, origin } = nextUrl;
  let data;

  try {
    data = await request.json();
  } catch (error) {
    return NextResponse.json(
      { code: '400.00.000', message: `Invalid json: ${(error as Error).message}` },
      { status: 400 }
    );
  }

  if (!data.payload) {
    return NextResponse.json({ code: '400.00.001', message: 'Missing payload' }, { status: 400 });
  }

  let decrypt;
  try {
    const { payload } = data;
    const secJws = encode(SecretJws);
    const veriSig = await jwt.verifySignature(payload, secJws);
    const secJwe = await importPKCS8(jwePrivateKey, JweAlgRsa);
    decrypt = await jwt.decryptData(veriSig, secJwe);

    const jwtTemp = await createJWT(decrypt, jwsPrivateKey);
    await verifyJwt(jwtTemp, jwsPublicKey);
  } catch (error) {
    return NextResponse.json(
      { code: '500.00.000', message: `customerRequest: ${(error as Error).message}` },
      { status: 500 }
    );
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
      method,
      body,
    });
    const { status } = response;
    const data = await response.json();
    let payload = undefined;

    if (data) {
      const secJwe = encode(SecretJwe);
      const sec = await jwt.encryptData(data, secJwe, JweAlgSec);
      const secJws = await importPKCS8(jwsPrivateKey, jwsAlgRsa);
      payload = await jwt.signData(sec, secJws, jwsAlgRsa);
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
