'use server';

import axios from 'axios';
import { importPKCS8, importSPKI } from 'jose';
// Internal app
import { jwtAlgs, headersKey } from '@/constans';
import { servHttpSetts } from '@/tenants/tenantSettings';
import { createErrorResponseApi, createResponseApi } from './helpersAxios';
import { decryptData, disassembleJWS, encryptData, signData } from '@/security';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const servicesAxios = axios.create();

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
servicesAxios.interceptors.request.use(async (request) => {
  const { data } = request;
  const { servUrl, servJwePubKey, servJwsPrivKey } = await servHttpSetts();
  request.baseURL = servUrl;

  if (data?.payload) {
    try {
      let { payload } = data;
      const secretJwe = await importSPKI(servJwePubKey, jwtAlgs.jweAlgRsa);
      payload = await encryptData(payload, secretJwe, jwtAlgs.jweAlgRsa);
      const secretJws = await importPKCS8(servJwsPrivKey, jwtAlgs.jwsAlgRsa);
      const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
      const authJws = disassembleJWS(signedData);
      request.headers[headersKey.servJwsToken] = `JWS ${authJws}`;

      request.data = { data: payload };
    } catch (error) {
      throw new Error(`servicesAxios Request: (${(error as Error).message})`);
    }
  }

  return request;
});

/**
 * Interceptor for handling response decryption and verification.
 * Verifies the response signature and decrypts the data.
 */
servicesAxios.interceptors.response.use(
  async (response) => {
    const { data } = response;

    if (data?.data) {
      const { servJwePrivKey } = await servHttpSetts();
      const { code, message, datetime, metadata, data: cipherData } = data;

      try {
        const secretJwe = await importPKCS8(servJwePrivKey, jwtAlgs.jweAlgRsa);
        let payload = await decryptData(cipherData, secretJwe);

        if (metadata) {
          payload = { ...payload, metadata };
        }

        response.data = createResponseApi({ code, datetime, message, payload });
      } catch (error) {
        response.status = 500;
        response.data = createResponseApi({
          code: '500.00.000',
          message: `servicesAxios Response (${(error as Error).message})`,
        });
      }
    }

    return response;
  },
  (error) => {
    return createErrorResponseApi(error);
  }
);

export default servicesAxios;
