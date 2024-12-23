import { importSPKI } from 'jose';
import type { AxiosResponse } from 'axios';
import axios, { isAxiosError } from 'axios';
// Internal app
import type { RequestContent } from '@/interfaces';
import { requestContentSchema } from '@/schemas';
import { createHttpConfig } from './helpersAxios';
import { jwtAlgs, webKeys, baseURLs, headersKey, apiPaths } from '@/utils/constans';
import { encryptData, decryptData, signData, verifySignature, disassembleJWS, assembleJWS, encode } from '@/security';

/**
 * Manages HTTP requests for the browser.
 * @param {RequestContent} requestContent - The content of the request.
 * @returns {Promise<AxiosResponse>} The response from the service.
 * @throws {Error} If the request content is invalid or the request fails.
 */
export default async function manageBrowserRequest(requestContent: RequestContent): Promise<AxiosResponse> {
  const parsedReqContent = requestContentSchema.safeParse(requestContent);
  let httpConfig = createHttpConfig();

  if (!parsedReqContent.success) {
    throw new Error(`Invalid browser request: ${JSON.stringify(parsedReqContent.error)}`);
  }

  const { method, pathUrl, dataRequest } = parsedReqContent.data;
  httpConfig = parsedReqContent.data.httpConfig ?? httpConfig;

  const responseBrowserReq = await browserAxios({ url: `${pathUrl}`, method, data: dataRequest, ...httpConfig });

  return responseBrowserReq;
}

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
        const signedData = assembleJWS(tokenApp, payload);
        const secretJws = await importSPKI(webKeys.webJwsPubKey, jwtAlgs.jwsAlgRsa);
        const signatureVerified = await verifySignature(signedData, secretJws);
        const secretJwe = encode(webKeys.secJweStr);
        const decrypt = await decryptData(signatureVerified, secretJwe);

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
