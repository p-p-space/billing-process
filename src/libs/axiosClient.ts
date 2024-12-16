import axios from 'axios';
import { importSPKI } from 'jose';
// Internal app
import * as jwt from '@/handlers/handleJwt';
import {
  encode,
  rsaAlgJwe,
  jwePublicKey,
  jwsAlgRsa,
  secretAlgJws,
  jwsPublicKey,
  jweSecretString,
  jwsSecretString,
  pathServ,
  bodyContent,
  originalPath,
} from '@/utils/constans';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
export const httpClientInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WEB_URL}/${pathServ}`,
  timeout: 59800,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
httpClientInstance.interceptors.request.use(
  async (request) => {
    const { data, url } = request;
    request.headers[bodyContent] = !!data;
    request.headers[originalPath] = url;

    if (data) {
      try {
        const secretJwe = await importSPKI(jwePublicKey, rsaAlgJwe);
        const encrypt = await jwt.encryptData(data, secretJwe, rsaAlgJwe);
        const secretJws = encode(jwsSecretString);
        const payload = await jwt.signData(encrypt, secretJws, secretAlgJws);

        request.data = { payload };
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
httpClientInstance.interceptors.response.use(
  async (response) => {
    const { data } = response;

    if (data && data.payload) {
      const { payload } = data;

      try {
        const secretJws = await importSPKI(jwsPublicKey, jwsAlgRsa);
        const signatureVerified = await jwt.verifySignature(payload, secretJws);
        const secretJwe = encode(jweSecretString);
        const decrypt = await jwt.decryptData(signatureVerified, secretJwe);

        response.data.payload = decrypt;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Response: ${(error as Error).message}`));
      }
    }

    return response;
  },
  (error) => {
    console.error(new Error(`httpClientInstance: ${(error as Error).message}`));
    const { response } = error;

    if (response.data.error) {
      console.error(response.data.error);
    }

    return error;
  }
);
