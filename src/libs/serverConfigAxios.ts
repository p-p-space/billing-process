import axios from 'axios';
import { importPKCS8, importSPKI } from 'jose';
// Internal app
import * as jwt from '@/handlers/handleJwt';
import {
  rsaAlgJwe,
  jwsAlgRsa,
  servJwePublicKey,
  servJwsPrivateKey,
  servJwePrivateKey,
  servJwsPublicKey,
} from '@/utils/constans';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
export const serverAxios = axios.create();

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
serverAxios.interceptors.request.use(
  async (request) => {
    const { data } = request;
    const { way = '' } = data;
    delete data.way;

    if (data && way === 'core') {
      let payload = data;

      try {
        const secretJwe = await importSPKI(servJwePublicKey, rsaAlgJwe);
        payload = await jwt.encryptData(payload, secretJwe, rsaAlgJwe);
        const secretJws = await importPKCS8(servJwsPrivateKey, jwsAlgRsa);
        const signedData = await jwt.signData(payload, secretJws, jwsAlgRsa);
        const authJws = jwt.disassembleJWS(signedData);
        request.headers['X-Token'] = `JWS ${authJws}`;

        request.data = payload;
      } catch (error) {
        console.log({ error });
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

    if (data?.data) {
      const { data } = response.data.data;
      try {
        const secretJws = await importSPKI(servJwsPublicKey, jwsAlgRsa);
        const signatureVerified = await jwt.verifySignature(data, secretJws);
        const secretJwe = await importPKCS8(servJwePrivateKey, rsaAlgJwe);
        const decrypt = await jwt.decryptData(signatureVerified, secretJwe);

        response.data.data = decrypt;
      } catch (error) {
        return Promise.reject(new Error(`Client Interceptor Response: ${(error as Error).message}`));
      }
    }

    return response;
  },
  (error) => {
    console.log('error---------------', { error });
    return error;
  }
);
