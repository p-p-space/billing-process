import axios from 'axios';

export const httpClientInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WEB_URL}/api/v1`,
  timeout: 59800,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  transformRequest: [
    (data) => {
      // console.log({ data, headers });

      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      // console.log({ data });

      return JSON.parse(data);
    },
  ],
});

httpClientInstance.interceptors.request.use(
  async (request) => {
    // const { url, data, method } = request;
    // console.log({ url, data, method });

    return request;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

httpClientInstance.interceptors.response.use(
  async (response) => {
    // console.log({response});

    return response;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
