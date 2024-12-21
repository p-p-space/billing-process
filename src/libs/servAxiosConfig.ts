import axios, { isAxiosError } from 'axios';
import { importPKCS8, importSPKI } from 'jose';
// Internal app
import * as jwt from '@/utils/tokenHandler';
import { RequestContent } from '@/interfaces';
import { requestContentSchema } from '@/schemas';
import { jwtAlgs, baseURLs, servKeys, headersKey } from '@/utils/constans';

export default async function manageServicesRequest(servRequest: RequestContent) {
  const parsedData = requestContentSchema.safeParse(servRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid server request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, pathUrl, dataRequest, httpConfig } = parsedData.data;
  const url = `${baseURLs.serv}${pathUrl}`;

  return await servicesAxios({ url, method, data: dataRequest, ...httpConfig });
}

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const servicesAxios = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
servicesAxios.interceptors.request.use(
  async (request) => {
    const { data, headers } = request;
    const appContentSec = !!headers[headersKey.appContentSecurity];

    if (data && appContentSec) {
      try {
        const secretJwe = await importSPKI(servKeys.servJwePubKey, jwtAlgs.jweAlgRsa);
        const payload = await jwt.encryptData(data, secretJwe, jwtAlgs.jweAlgRsa);
        const secretJws = await importPKCS8(servKeys.servJwsPrivKey, jwtAlgs.jwsAlgRsa);
        const signedData = await jwt.signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
        const authJws = jwt.disassembleJWS(signedData);
        request.headers[headersKey.servJwsToken] = `JWS ${authJws}`;

        request.data = payload;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Request: ${(error as Error).message}`));
      }
    }

    return request;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      const { data } = error.response;
      const errorResponse = { ...data, error: data?.error || `${(error as Error).message}` };
      error.response.data = errorResponse;

      return error;
    }

    throw error;
  }
);

/**
 * Interceptor for handling response decryption and verification.
 * Verifies the response signature and decrypts the data.
 */
servicesAxios.interceptors.response.use(
  async (response) => {
    const { data } = response;

    if (data?.data) {
      const { data } = response.data;

      try {
        const secretJwe = await importPKCS8(servKeys.servJwePrivKey, jwtAlgs.jweAlgRsa);
        const payload = await jwt.decryptData(data, secretJwe);
        const responseServ = {
          code: response.data.code,
          message: response.data.message,
          payload,
        };

        response.data = responseServ;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Response: ${(error as Error).message}`));
      }
    }

    return response;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      const { data } = error.response;
      const errorResponse = { ...data, error: data?.error || `${(error as Error).message}` };
      error.response.data = errorResponse;

      return error;
    }
    throw error;
  }
);
