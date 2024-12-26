import { importSPKI } from 'jose';
import axios, { isAxiosError } from 'axios';
// Internal app
import { jwtAlgs, webKeys, baseURLs, headersKey, apiPaths } from '@/utils/constans';
import { encryptData, decryptData, signData, verifySignature, disassembleJWS, assembleJWS, encode } from '@/security';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const browserAxios = axios.create({
  baseURL: `${baseURLs.app}${apiPaths.servPath}`,
  timeout: 59850,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return (status >= 200 && status < 300) || (status >= 400 && status <= 500);
  },
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
browserAxios.interceptors.request.use(
  async (request) => {
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
        return Promise.reject(new Error(`Browser Interceptor Request: ${(error as Error).message}`));
      }
    }

    return request;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      throw error.response;
    }

    throw error;
  }
);

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
        return Promise.reject(new Error(`Browser Interceptor Response: ${(error as Error).message}`));
      }
    }

    return response;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }

    throw error;
  }
);

export default browserAxios;
