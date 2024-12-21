import axios, { isAxiosError } from 'axios';
import { importSPKI } from 'jose';
// Internal app
import { WebRequest } from '@/interfaces';
import { webRequestSchema } from '@/schemas';
import * as jwt from '@/utils/tokenHandler';
import { jwtAlgs, webKeys, baseURLs, headersKey, apiPaths } from '@/utils/constans';

export async function manageBrowserRequest(webRequest: WebRequest) {
  const parsedData = webRequestSchema.safeParse(webRequest);

  try {
    if (!parsedData.success) {
      throw new Error(`Invalid web request: ${JSON.stringify(parsedData.error)}`);
    }

    const { method, pathUrl, dataRequest } = parsedData.data;
    const url = `${baseURLs.app}${apiPaths.servPath}${pathUrl}`;

    return await browserAxios({ url, method, data: dataRequest });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw error;
  }
}

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const browserAxios = axios.create({
  timeout: 59850,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
browserAxios.interceptors.request.use(
  async (request) => {
    const { data, headers } = request;
    headers[headersKey.appContentSecurity] = data ? 'enc' : null;

    if (data) {
      try {
        const secretJwe = await importSPKI(webKeys.webJwePubKey, jwtAlgs.jweAlgRsa);
        const payload = await jwt.encryptData(data, secretJwe, jwtAlgs.jweAlgRsa);
        const secretJws = jwt.encode(webKeys.secJwsStr);
        const signedData = await jwt.signData(payload, secretJws, jwtAlgs.jwsAlgSec);
        const authJws = jwt.disassembleJWS(signedData);
        headers[headersKey.appJwsToken] = `JWS ${authJws}`;

        request.data = { payload };
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Request: ${(error as Error).message}`));
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
        const signedData = jwt.assembleJWS(tokenApp, payload);
        const secretJws = await importSPKI(webKeys.webJwsPubKey, jwtAlgs.jwsAlgRsa);
        const signatureVerified = await jwt.verifySignature(signedData, secretJws);
        const secretJwe = jwt.encode(webKeys.secJweStr);
        const decrypt = await jwt.decryptData(signatureVerified, secretJwe);

        response.data.payload = decrypt;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Response: ${(error as Error).message}`));
      }
    }

    return response;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      throw error.response;
    }

    throw error;
  }
);
