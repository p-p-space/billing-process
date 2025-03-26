import { importPKCS8 } from 'jose';
import { NextRequest } from 'next/server';
// Internal app
import { createResponseApi } from '../http';
import { HttpRequest, Tenant } from '@/interfaces';
import { appHttpSetts } from '@/tenants/tenantSettings';
import { apiPaths, jwtAlgs, headersKey } from '@/constans';
import { assembleJWS, verifySignature, decryptData, encryptData, signData, disassembleJWS, encode } from '@/security';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */

export async function applicationRequest(httpRequest: HttpRequest) {
  const { method, pathUrl, httpConfig, ...dataReq } = httpRequest;
  const { headers, timeout } = httpConfig;
  const tenant = headers[headersKey.appTenant] as Tenant;
  let { dataRequest } = dataReq;

  const { secJweStr, secJwsStr, webJwePrivKey, webJwsPrivKey, webUrl } = await appHttpSetts(tenant);
  const url = `${webUrl}${apiPaths.appAPiV1}${pathUrl}`;

  if (dataRequest?.payload) {
    try {
      const payload = dataRequest.payload as string;
      const tokenApp = headers[headersKey.appJwsToken];
      const signedData = assembleJWS(tokenApp, payload);
      const secretJws = encode(secJwsStr);
      const signatureVerified = await verifySignature(signedData, secretJws);
      const secretJwe = await importPKCS8(webJwePrivKey, jwtAlgs.jweAlgRsa);
      const decrypt = await decryptData(signatureVerified, secretJwe);

      if (pathUrl !== apiPaths.appApiServ) {
        dataRequest = decrypt;
      } else {
        dataRequest.payload = decrypt;
      }
    } catch (error) {
      throw new Error(`application Request (${(error as Error).message})`);
    }
  }

  const body = dataRequest ? JSON.stringify(dataRequest) : dataRequest;

  if (pathUrl !== apiPaths.appApiServ) {
    console.log(`Request url: ${url} headers: ${JSON.stringify(headers)} data: ${body}`);
  }

  const fetchInstance = { method, headers, body, signal: AbortSignal.timeout(timeout) };
  const fetchRequest = new NextRequest(url, fetchInstance);
  const response = await fetch(fetchRequest);
  const { status, headers: headersResp } = response;
  let data = await response.json();

  if (pathUrl !== apiPaths.appApiServ) {
    console.log(`Response url: ${url} headers: ${JSON.stringify(headersResp)} data: ${JSON.stringify(data)}`);
  }

  try {
    if (data?.payload) {
      let { payload } = data;
      const secretJwe = encode(secJweStr);
      payload = await encryptData(payload, secretJwe, jwtAlgs.jweAlgSec);
      const secretJws = await importPKCS8(webJwsPrivKey, jwtAlgs.jwsAlgRsa);
      const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
      const authJws = disassembleJWS(signedData);

      data = createResponseApi({ ...data, payload, authJws });
    }
  } catch (error) {
    throw new Error(`application Response (${(error as Error).message})`);
  }

  return { data, status };
}
