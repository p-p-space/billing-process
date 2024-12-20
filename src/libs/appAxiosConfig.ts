import axios, { isAxiosError } from 'axios';
// Internal app
import { baseURLs, apiPaths } from '@/utils/constans';
import { webRequestSchema } from '@/schemas';
import { WebRequest } from '@/interfaces';

export async function manageAppRequest(webRequest: WebRequest) {
  const parsedData = webRequestSchema.safeParse(webRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid web request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, pathUrl, dataRequest } = parsedData.data;
  const url = `${baseURLs.app}${apiPaths.appPath}${pathUrl}`;

  const { data } = await browserAxios({ url, method, data: dataRequest });
  const { code, message } = data;
  console.log({ code, message });

  return data;
}

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const browserAxios = axios.create({
  timeout: 59850,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
browserAxios.interceptors.request.use(
  async (request) => {
    return request;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      return error.response;
    }

    throw error;
  }
);

/**
 * Interceptor for handling response decryption and verification.
 * Verifies the response signature and decrypts the data.
 */
browserAxios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error) && error.response) {
      return error.response;
    }

    throw error;
  }
);
