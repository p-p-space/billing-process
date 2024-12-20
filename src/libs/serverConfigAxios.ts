import axios, { isAxiosError } from 'axios';
import { importPKCS8, importSPKI } from 'jose';
// Internal app
import { ServRequest } from '@/interfaces';
import * as jwt from '@/handlers/handleJwt';
import { servRequestSchema } from '@/schemas';
import { jwtAlgs, servJwePublicKey, servJwsPrivateKey, servJwePrivateKey, baseURLs } from '@/utils/constans';

export async function manageServicesRequest(servRequest: ServRequest) {
  const parsedData = servRequestSchema.safeParse(servRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid server request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, pathUrl, dataRequest, axiosConfig } = parsedData.data;
  const url = `${baseURLs.serv}${pathUrl}`;

  const response = await servicesAxios({ url, method, data: dataRequest, ...axiosConfig });

  return response;
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
    const { data } = request;

    if (data?.cipher) {
      delete data.cipher;

      try {
        const secretJwe = await importSPKI(servJwePublicKey, jwtAlgs.jweAlgRsa);
        const payload = await jwt.encryptData(data, secretJwe, jwtAlgs.jweAlgRsa);
        const secretJws = await importPKCS8(servJwsPrivateKey, jwtAlgs.jwsAlgRsa);
        const signedData = await jwt.signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
        const authJws = jwt.disassembleJWS(signedData);
        request.headers['X-Token'] = `JWS ${authJws}`;

        request.data = payload;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Request: ${(error as Error).message}`));
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(new Error(error));
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
        const secretJwe = await importPKCS8(servJwePrivateKey, jwtAlgs.jweAlgRsa);
        const decrypt = await jwt.decryptData(data, secretJwe);

        response.data.data = decrypt;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Response: ${(error as Error).message}`));
      }
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
