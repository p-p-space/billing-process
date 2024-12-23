import { importPKCS8 } from 'jose';
import type { AxiosResponse } from 'axios';
import axios, { isAxiosError } from 'axios';
// Internal app
import { RequestContent } from '@/interfaces';
import { requestContentSchema } from '@/schemas';
import { createHttpConfig } from './helpersAxios';
import { apiPaths, baseURLs, headersKey, jwtAlgs, servKeys, webKeys } from '@/utils/constans';
import { assembleJWS, verifySignature, decryptData, encryptData, signData, disassembleJWS, encode } from '@/security';

/**
 * Manages HTTP requests for the application.
 * @param {RequestContent} requestContent
 * @returns {Promise<AxiosResponse>} The response from the service.
 * @throws {Error} If the request content is invalid or the request fails.
 */
export default async function manageAppRequest(requestContent: RequestContent): Promise<AxiosResponse> {
  const parsedReqContent = requestContentSchema.safeParse(requestContent);
  let httpConfig = createHttpConfig();

  if (!parsedReqContent.success) {
    throw new Error(`Invalid application request: ${JSON.stringify(parsedReqContent.error)}`);
  }

  const { method, pathUrl, dataRequest } = parsedReqContent.data;
  httpConfig = parsedReqContent.data.httpConfig ?? httpConfig;

  const responseAppReq = await appAxios({ url: `${pathUrl}`, method, data: dataRequest, ...httpConfig });

  return responseAppReq;
}

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const appAxios = axios.create({
  baseURL: `${baseURLs.app}${apiPaths.appPath}`,
  timeout: 59800,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor for handling request decryption and verification.
 * Verifies the request signature and decrypts the data.
 */
appAxios.interceptors.request.use(
  async (request) => {
    const { data, headers } = request;
    const appContentSec = !!headers[headersKey.appContentSecurity];

    if (data && appContentSec) {
      try {
        let { payload } = data;
        const tokenApp = headers[headersKey.appJwsToken];
        const signedData = assembleJWS(tokenApp, payload);
        const secretJws = encode(webKeys.secJwsStr);
        const signatureVerified = await verifySignature(signedData, secretJws);
        const secretJwe = await importPKCS8(servKeys.webJwePrivKey, jwtAlgs.jweAlgRsa);
        payload = await decryptData(signatureVerified, secretJwe);

        request.data = payload;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Request: ${(error as Error).message}`));
      }
    }

    return request;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      return error.response;
    }

    throw error;
  }
);

/**
 * Interceptor for handling response encryption and signing.
 * Encrypts the response data and signs it before sending.
 */
appAxios.interceptors.response.use(
  async (response) => {
    const { data } = response;

    if (data.payload) {
      let { payload } = data;
      const secretJwe = encode(webKeys.secJweStr);
      payload = await encryptData(payload, secretJwe, jwtAlgs.jweAlgSec);
      const secretJws = await importPKCS8(servKeys.webJwsPrivKey, jwtAlgs.jwsAlgRsa);
      const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
      const authJws = disassembleJWS(signedData);

      response.data = { ...data, payload, authJws };
    }

    return response;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      return error.response;
    }

    throw error;
  }
);
