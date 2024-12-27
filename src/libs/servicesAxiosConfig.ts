import axios from 'axios';
import { importPKCS8, importSPKI } from 'jose';
// Internal app
import { decryptData, disassembleJWS, encryptData, signData } from '@/security';
import { jwtAlgs, baseURLs, servKeys, headersKey, apiPaths } from '@/utils/constans';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const servicesAxios = axios.create({
  baseURL: `${baseURLs.serv}${apiPaths.servPath}`,
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
servicesAxios.interceptors.request.use(async (request) => {
  const { data, headers } = request;
  const appContentSec = !!headers[headersKey.appContentSecurity];

  if (data && appContentSec) {
    headers.delete(headersKey.appContentSecurity);

    try {
      const secretJwe = await importSPKI(servKeys.servJwePubKey, jwtAlgs.jweAlgRsa);
      const payload = await encryptData(data, secretJwe, jwtAlgs.jweAlgRsa);
      const secretJws = await importPKCS8(servKeys.servJwsPrivKey, jwtAlgs.jwsAlgRsa);
      const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
      const authJws = disassembleJWS(signedData);
      request.headers[headersKey.servJwsToken] = `JWS ${authJws}`;

      request.data = { data: payload };
    } catch (error) {
      throw new Error(`servicesAxios: (${(error as Error).message})`);
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
      const { code, message, datetime, data: cipherData } = data;

      try {
        const secretJwe = await importPKCS8(servKeys.servJwePrivKey, jwtAlgs.jweAlgRsa);
        const payload = await decryptData(cipherData, secretJwe);

        response.data = { code, datetime, message, payload };
      } catch (error) {
        throw new Error(`servicesAxios: (${(error as Error).message})`);
      }
    }

    return response;
  },
  (error) => {
    return error;
  }
);

export default servicesAxios;
