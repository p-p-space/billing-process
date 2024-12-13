import axios from 'axios';
// Internal app
import { encryptData, signatureData } from '@/handlers';
import { jwePublicKey, jwsPrivateKey } from '@/utils/constans';

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
      const encrypt = await encryptData(data, jwePublicKey);
      const payload = await signatureData(encrypt, jwsPrivateKey);

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
    return response;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
