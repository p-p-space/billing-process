import axios from 'axios';
import { importPKCS8 } from 'jose';
// Internal app
import { createErrorResponseApi, createResponseApi } from './helpersAxios';
import { apiPaths, baseURLs, headersKey, jwtAlgs, servKeys, webKeys } from '@/utils/constans';
import { assembleJWS, verifySignature, decryptData, encryptData, signData, disassembleJWS, encode } from '@/security';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const applicationAxios = axios.create({
  baseURL: `${baseURLs.app}${apiPaths.appPath}`,
});

/**
 * Interceptor for handling request decryption and verification.
 * Verifies the request signature and decrypts the data.
 */
applicationAxios.interceptors.request.use(async (request) => {
  const { data, headers } = request;
  const appContentSec = !!headers[headersKey.appContentSecurity];

  if (data?.payload && appContentSec) {
    try {
      let { payload } = data;
      const tokenApp = headers[headersKey.appJwsToken];
      const signedData = assembleJWS(tokenApp, payload);
      const secretJws = encode(webKeys.secJwsStr);
      const signatureVerified = await verifySignature(signedData, secretJws);
      const secretJwe = await importPKCS8(servKeys.webJwePrivKey, jwtAlgs.jweAlgRsa);
      payload = await decryptData(signatureVerified, secretJwe);

      request.data.payload = payload;
    } catch (error) {
      throw new Error(`applicationAxios Request (${(error as Error).message})`);
    }
  }

  return request;
});

/**
 * Interceptor for handling response encryption and signing.
 * Encrypts the response data and signs it before sending.
 */
applicationAxios.interceptors.response.use(
  async (response) => {
    const { data, status } = response;

    if (status >= 300 && !data.message) {
      const respApi = {
        code: `${status}.00.000`,
        message: status === 404 ? data.fault.faultstring : `Request failed with status code ${status}`,
      };

      response.data = createResponseApi(respApi);
    }

    try {
      if (data?.payload) {
        let { payload } = data;
        const secretJwe = encode(webKeys.secJweStr);
        payload = await encryptData(payload, secretJwe, jwtAlgs.jweAlgSec);
        const secretJws = await importPKCS8(servKeys.webJwsPrivKey, jwtAlgs.jwsAlgRsa);
        const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
        const authJws = disassembleJWS(signedData);

        response.data = { ...data, payload, authJws };
      }
    } catch (error) {
      const respApi = {
        code: `500.00.000`,
        message: `applicationAxios Response (${(error as Error).message})`,
      };

      response.status = 500;
      response.data = createResponseApi(respApi);
    }

    return response;
  },
  (error) => {
    return createErrorResponseApi(error);
  }
);

export default applicationAxios;
