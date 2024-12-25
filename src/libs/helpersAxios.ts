import { AxiosInstance } from 'axios';
import type { AxiosResponse } from 'axios';
import { headersKey } from '@/utils/constans';
import { requestContentSchema } from '@/schemas';
import { applicationAxios, browserAxios, servicesAxios } from './';
import type { HeaderConfig, HttpConfig, RequestContent, RequestType } from '@/interfaces';

/**
 * Creates an HTTP configuration object.
 *
 * @param {HeaderConfig} [config] - Optional configuration for headers and timeout.
 * @returns {HttpConfig} The HTTP configuration object.
 */
export function createHttpConfig(config?: HeaderConfig): HttpConfig {
  const httpConfig: HttpConfig = {
    headers: {},
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
export async function manageRequest(requestContent: RequestContent, requestType: RequestType): Promise<AxiosResponse> {
  const parsedReqContent = requestContentSchema.safeParse(requestContent);
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
