import axios from 'axios';
import { importPKCS8, importSPKI } from 'jose';
// Internal app
import * as jwt from '@/handlers/handleJwt';
import {
  rsaAlgJwe,
  jwsAlgRsa,
  baseServURL,
  servJwePublicKey,
  servJwsPrivateKey,
  servJwePrivateKey,
} from '@/utils/constans';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
export const serverAxios = axios.create({
  baseURL: baseServURL,
  timeout: 59650,
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
serverAxios.interceptors.request.use(
  async (request) => {
    const { data } = request;

    if (data) {
      try {
        const secretJwe = await importSPKI(servJwePublicKey, rsaAlgJwe);
        const encrypt = await jwt.encryptData(data, secretJwe, rsaAlgJwe);
        const secretJws = await importPKCS8(servJwsPrivateKey, jwsAlgRsa);
        const payload = await jwt.signData(encrypt, secretJws, jwsAlgRsa);

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
serverAxios.interceptors.response.use(
  async (response) => {
    const { data } = response;

    if (data?.payload) {
      const { payload } = data;

      try {
        const secretJws = await importSPKI(servJwePublicKey, jwsAlgRsa);
        const signatureVerified = await jwt.verifySignature(payload, secretJws);
        const secretJwe = await importPKCS8(servJwePrivateKey, rsaAlgJwe);
        const decrypt = await jwt.decryptData(signatureVerified, secretJwe);

        response.data.payload = decrypt;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Response: ${(error as Error).message}`));
      }
    }

    return response;
  },
  (error) => {
    const { response } = error;

    if (response.data.error) {
      console.error(response.data.error);
    }

    return error;
  }
);
