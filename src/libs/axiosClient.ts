import axios from 'axios';
// Internal app
import { createJWT, decryptData, encryptData, signatureData, verifyJWE, verifyJwt } from '@/handlers';
import { jwePrivateKey, jwePublicKey, jwsPrivateKey, jwsPublicKey } from '@/utils/constans';

export const httpClientInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WEB_URL}/api/v1`,
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

    const encrypt = await encryptData(data, jwePublicKey);
    console.log({ encrypt });
    const signature = await signatureData(encrypt, jwsPrivateKey);
    console.log({ signature });
    const verifySignature = await verifyJWE(signature, jwsPublicKey);
    console.log({ verifySignature });
    const decrypt = await decryptData(verifySignature, jwePrivateKey);
    console.log({ decrypt });
    const jwt = await createJWT(decrypt, jwsPrivateKey);
    console.log({ jwt });
    const verify = await verifyJwt(jwt, jwsPublicKey);
    console.log({ verify });

    return request;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

httpClientInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
