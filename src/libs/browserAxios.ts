import axios from 'axios';
import { importSPKI } from 'jose';
// Internal app
import * as jwt from '@/handlers/handleJwt';
import {
  rsaAlgJwe,
  webJwePublicKey,
  jwsAlgRsa,
  secretAlgJws,
  webJwsPublicKey,
  webJweSecretString,
  webJwsSecretString,
  jwsToken,
} from '@/utils/constans';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
export const browserAxios = axios.create({
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
browserAxios.interceptors.request.use(
  async (request) => {
    const { data } = request;

    if (data) {
      try {
        const secretJwe = await importSPKI(webJwePublicKey, rsaAlgJwe);
        const payload = await jwt.encryptData(data, secretJwe, rsaAlgJwe);
        const secretJws = jwt.encode(webJwsSecretString);
        const signedData = await jwt.signData(payload, secretJws, secretAlgJws);
        const authJws = jwt.disassembleJWS(signedData);
        request.headers[jwsToken] = `JWS ${authJws}`;

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
browserAxios.interceptors.response.use(
  async (response) => {
    const { data, headers } = response;

    if (data?.payload) {
      const { payload } = data;

      try {
        const tokenApp = headers[jwsToken];
        const signedData = jwt.assembleJWS(tokenApp, payload);
        const secretJws = await importSPKI(webJwsPublicKey, jwsAlgRsa);
        const signatureVerified = await jwt.verifySignature(signedData, secretJws);
        const secretJwe = jwt.encode(webJweSecretString);
        const decrypt = await jwt.decryptData(signatureVerified, secretJwe);

        response.data.payload = decrypt;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Response: ${(error as Error).message}`));
      }
    }

    return response;
  },
  (error) => {
    console.error(new Error(`browserAxios: ${(error as Error).message}`));
    const { response } = error;

    if (response.data.error) {
      console.error(response.data.error);
    }

    return error;
  }
);
