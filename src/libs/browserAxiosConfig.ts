import axios from 'axios';
import { importSPKI } from 'jose';
// Internal app
import { baseURLs, jwtAlgs, headersKey, webKeys } from '@/constans';
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

  if (data) {
    try {
      const secretJwe = await importSPKI(webKeys.webJwePubKey, jwtAlgs.jweAlgRsa);
      const payload = await encryptData(data, secretJwe, jwtAlgs.jweAlgRsa);
      const secretJws = encode(webKeys.secJwsStr);
      const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgSec);
      const authJws = disassembleJWS(signedData);
      headers[headersKey.appJwsToken] = `JWS ${authJws}`;

      request.data = { payload };
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
      const { payload } = data;

      try {
        const tokenApp = headers[headersKey.appJwsToken];
        const signedData = assembleJWS(tokenApp, payload);
        const secretJws = await importSPKI(webKeys.webJwsPubKey, jwtAlgs.jwsAlgRsa);
        const signatureVerified = await verifySignature(signedData, secretJws);
        const secretJwe = encode(webKeys.secJweStr);
        const decrypt = await decryptData(signatureVerified, secretJwe);

        response.data.payload = decrypt;
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
