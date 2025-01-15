import { AxiosInstance, isAxiosError } from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
// Internal App
import { headersKey } from '@/constans';
import { httpSchemas } from '@/schemas';
import { applicationAxios, browserAxios, servicesAxios } from './';
import type { ErrorResponseApi, RequestAxios } from '@/interfaces/httpInterface';
import type { HeaderConfig, HttpConfig, ReqResBody, RequestType, ResponseApi } from '@/interfaces';

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
 * Manages an HTTP request.
 *
 * @param {RequestContent} requestContent - The content of the request.
 * @param {RequestType} requestType - The type of the request.
 * @returns {Promise<AxiosResponse>} The response from the Axios request.
 * @throws Will throw an error if the request content is invalid.
 */
export async function manageRequest(requestAxios: RequestAxios, requestType: RequestType): Promise<AxiosResponse> {
  const parsedReqContent = httpSchemas.requestAxios.safeParse(requestAxios);
  let httpConfig = createHttpConfig();

  if (!parsedReqContent.success) {
    throw new Error(`Invalid ${requestType} Request: ${JSON.stringify(parsedReqContent.error)}`);
  }

  const { method, pathUrl, dataRequest } = parsedReqContent.data;
  httpConfig = parsedReqContent.data.httpConfig ?? httpConfig;

  const axiosInstance = createAxiosInstance(requestType);
  const response = await axiosInstance({ url: `${pathUrl}`, method, data: dataRequest, ...httpConfig });

  return response;
}

/**
 * Creates an Axios instance with the given configuration.
 *
 * @param {RequestType} requestType - The type of the request.
 * @returns {AxiosInstance} The Axios instance.
 */
function createAxiosInstance(requestType: RequestType): AxiosInstance {
  const axiostInstance = {
    browser: browserAxios,
    application: applicationAxios,
    services: servicesAxios,
  };

  return axiostInstance[requestType];
}

/**
 * Create an API response object.
 *
 * @param {ReqResBody} dataResponse - The data to include in the response.
 * @returns {ResponseApi} The response object.
 */
export function createResponseApi(dataResponse: ReqResBody): ResponseApi {
  let responseApi: ResponseApi = {
    code: '500.00.00',
    message: 'Internal Server Error',
    datetime: new Date().toISOString(),
  };

  responseApi = { ...responseApi, ...dataResponse };

  return responseApi;
}

/**
 * Create an error response object.
 *
 * @param {AxiosError |Error} error - The error api response.
 * @returns {AxiosResponse | ErrorResponseApi} The error response object.
 */
export function createErrorResponseApi(error: AxiosError | Error): AxiosResponse | ErrorResponseApi {
  if (isAxiosError(error) && error.response) {
    error.response.data = createResponseApi({ code: `${error.status}.00.000`, message: error.message });

    return error.response;
  }

  const errorResponse = createResponseApi({ message: error.message });

  return {
    status: 500,
    data: errorResponse,
  };
}
