import axios from 'axios';
import { importSPKI } from 'jose';
// Internal app
import * as jwt from '@/handlers/handleJwt';
import {
  encode,
  rsaAlgJwe,
  webJwePublicKey,
  jwsAlgRsa,
  secretAlgJws,
  webJwsPublicKey,
  webJweSecretString,
  webJwsSecretString,
  pathServ,
  bodyContent,
  originPath,
  baseAppURL,
} from '@/utils/constans';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
export const browserAxios = axios.create({
  baseURL: `${baseAppURL}/${pathServ}`,
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
browserAxios.interceptors.request.use(
  async (request) => {
    const { data, url } = request;
    request.headers[bodyContent] = !!data;
    request.headers[originPath] = url;

    if (data) {
      try {
        const secretJwe = await importSPKI(webJwePublicKey, rsaAlgJwe);
        const payload = await jwt.encryptData(data, secretJwe, rsaAlgJwe);
        const secretJws = encode(webJwsSecretString);
        const signedData = await jwt.signData(payload, secretJws, secretAlgJws);
        const authJws = jwt.disassembleJWS(signedData);
        request.headers['App-token'] = `JWS ${authJws}`;

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
    const { data } = response;

    if (data?.payload) {
      const { payload } = data;

      try {
        const secretJws = await importSPKI(webJwsPublicKey, jwsAlgRsa);
        const signatureVerified = await jwt.verifySignature(payload, secretJws);
        const secretJwe = encode(webJweSecretString);
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
