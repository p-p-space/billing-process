import axios from 'axios';
import { importSPKI } from 'jose';
// Internal app
import { selectSettings } from '@/tenants/tenantOptions';
import { baseURLs, jwtAlgs, headersKey } from '@/constans';
import { createErrorResponseApi, createResponseApi } from './helpersAxios';
import { encryptData, decryptData, signData, verifySignature, disassembleJWS, assembleJWS, encode } from '@/security';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const browserAxios = axios.create({
  baseURL: `${baseURLs.app}`,
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
browserAxios.interceptors.request.use(async (request) => {
  const { data, headers } = request;

  if (data?.payload) {
    const { webJwePubKey, secJwsStr } = await selectSettings();

    try {
      let { payload } = data;
      const secretJwe = await importSPKI(webJwePubKey, jwtAlgs.jweAlgRsa);
      payload = await encryptData(payload, secretJwe, jwtAlgs.jweAlgRsa);
      const secretJws = encode(secJwsStr);
      const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgSec);
      const authJws = disassembleJWS(signedData);
      headers[headersKey.appJwsToken] = `JWS ${authJws}`;

      request.data.payload = payload;
    } catch (error) {
      throw new Error(`browserAxios Request (${(error as Error).message})`);
    }
  }

  return request;
});

/**
 * Interceptor for handling response decryption and verification.
 * Verifies the response signature and decrypts the data.
 */
browserAxios.interceptors.response.use(
  async (response) => {
    const { data, headers } = response;

    if (data?.payload) {
      const { webJwsPubKey, secJweStr } = await selectSettings();

      try {
        let { payload } = data;
        const tokenApp = headers[headersKey.appJwsToken];
        const signedData = assembleJWS(tokenApp, payload);
        const secretJws = await importSPKI(webJwsPubKey, jwtAlgs.jwsAlgRsa);
        const signatureVerified = await verifySignature(signedData, secretJws);
        const secretJwe = encode(secJweStr);
        payload = await decryptData(signatureVerified, secretJwe);

        response.data.payload = payload;
      } catch (error) {
        response.status = 500;
        response.data = createResponseApi({ message: `browserAxios Response (${(error as Error).message})` });
      }
    }

    return response;
  },
  (error) => {
    return createErrorResponseApi(error);
  }
);

export default browserAxios;
