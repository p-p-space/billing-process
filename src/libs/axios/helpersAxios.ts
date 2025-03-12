import { isAxiosError } from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
// Internal app
import { httpSchemas } from '@/schemas';
import { createHttpConfig } from '../http';
import { browserAxios, servicesAxios } from './';
import type { ErrorResponseApi, HttpRequest, RequestType } from '@/interfaces';

/**
 * Manages an HTTP request.
 *
 * @param {RequestContent} httpRequest - The content of the request.
 * @param {RequestType} requestType - The type of the request.
 * @returns {Promise<AxiosResponse>} The response from the Axios request.
 * @throws Will throw an error if the request content is invalid.
 */
export async function manageRequest(httpRequest: HttpRequest, requestType: RequestType): Promise<AxiosResponse> {
  const parsedReqContent = httpSchemas.httpRequest.safeParse(httpRequest);
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
    services: servicesAxios,
  };

  return axiostInstance[requestType];
}

/**
 * Create an error response object.
 *
 * @param {AxiosError | Error} error - The error api response.
 * @returns {AxiosResponse | ErrorResponseApi} The error response object.
 */
export function createErrorResponseApi(error: AxiosError | Error): AxiosResponse | ErrorResponseApi {
  if (isAxiosError(error) && error.response) {
    error.response.data = { code: `${error.status}.00.000`, message: error.message };

    return error.response;
  }

  const errorResponse = { code: '500.00.000', message: error.message };

  return {
    status: 500,
    data: errorResponse,
  };
}
