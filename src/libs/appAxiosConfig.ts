import { importPKCS8 } from 'jose';
import axios, { isAxiosError } from 'axios';
// Internal app
import { RequestContent } from '@/interfaces';
import { requestContentSchema } from '@/schemas';
import { createHttpConfig } from './helpersAxios';
import { apiPaths, baseURLs, headersKey, jwtAlgs, servKeys, webKeys } from '@/utils/constans';
import { assembleJWS, verifySignature, decryptData, encryptData, signData, disassembleJWS, encode } from '@/security';

export default async function manageAppRequest(appRequest: RequestContent) {
  const parseAppRequest = requestContentSchema.safeParse(appRequest);
  let httpConfig = createHttpConfig();

  try {
    if (!parseAppRequest.success) {
      throw new Error(`Invalid application request: ${JSON.stringify(parseAppRequest.error)}`);
    }

    const { method, pathUrl, dataRequest } = parseAppRequest.data;
    httpConfig = parseAppRequest.data.httpConfig ?? httpConfig;

    const response = await appAxios({ url: `${pathUrl}`, method, data: dataRequest, ...httpConfig });

    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }

    throw error;
  }
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
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
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
 * Interceptor for handling response decryption and verification.
 * Verifies the response signature and decrypts the data.
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
