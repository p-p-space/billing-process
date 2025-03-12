// Internal app
import { headersKey } from '@/constans';
import type { HeaderConfig, HttpConfig, ReqResBody, ResponseApi } from '@/interfaces';

/**
 * Creates an HTTP configuration object.
 *
 * @param {HeaderConfig} [config] - Optional configuration for headers and timeout.
 * @returns {HttpConfig} The HTTP configuration object.
 */
export function createHttpConfig(config?: HeaderConfig): HttpConfig {
  const httpConfig: HttpConfig = {
    timeout: 59800,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || (status >= 400 && status <= 503);
    },
    withCredentials: true,
  };

  if (config?.timeout) {
    const { timeout } = config;
    httpConfig.timeout = timeout;
  }

  if (config?.headers) {
    const { headers } = config;
    Object.values(headersKey).forEach((header) => {
      if (headers.has(header)) {
        httpConfig.headers[header] = `${headers.get(header)}`;
      }
    });
  }

  return httpConfig;
}

/**
 * Create an API response object.
 *
 * @param {ReqResBody} dataResponse - The data to include in the response.
 * @returns {ResponseApi} The response object.
 */
export function createResponseApi(dataResponse: ReqResBody): ResponseApi {
  let responseApi: ResponseApi = {
    code: '200.00.000',
    message: 'Process ok',
    datetime: new Date().toISOString(),
  };

  responseApi = { ...responseApi, ...dataResponse };

  return responseApi;
}
