import axios from 'axios';
// Internal app
import { importSPKI } from 'jose';
import * as jwt from '@/handlers/handleJwt';
import {
  encode,
  JweAlgRsa,
  jwePublicKey,
  jwsAlgRsa,
  jwsAlgSec,
  jwsPublicKey,
  SecretJwe,
  SecretJws,
} from '@/utils/constans';

export const httpClientInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WEB_URL}/api/v0`,
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

httpClientInstance.interceptors.request.use(
  async (request) => {
    const { data } = request;

    if (data) {
      const secJwe = await importSPKI(jwePublicKey, JweAlgRsa);
      const encrypt = await jwt.encryptData(data, secJwe, JweAlgRsa);
      const secJws = encode(SecretJws);
      const payload = await jwt.signData(encrypt, secJws, jwsAlgSec);

      request.data = { payload };
    }

    return request;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

httpClientInstance.interceptors.response.use(
  async (response) => {
    const { data } = response;
    let decrypt = undefined;

    if (data) {
      const { payload } = data;
      const secJws = await importSPKI(jwsPublicKey, jwsAlgRsa);
      const veriSig = await jwt.verifySignature(payload, secJws);
      const secJwe = encode(SecretJwe);
      decrypt = await jwt.decryptData(veriSig, secJwe);

      response.data = decrypt;
    }

    return response;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
