import { AxiosResponse } from 'axios';
import { headersKey } from '@/utils/constans';
import { requestContentSchema } from '@/schemas';
import type { HeaderConfig, HttpConfig, RequestContent, RequestType } from '@/interfaces';
import browserAxios from './browserAxiosConfig';
import appAxios from './appAxiosConfig';
import servicesAxios from './servAxiosConfig';

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
      httpConfig.headers[header] = headers.get(header);
    });
  }

  return httpConfig;
}

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

function createAxiosInstance(requestType: RequestType) {
  const axiostInstance = {
    browser: browserAxios,
    application: appAxios,
    services: servicesAxios,
  };

  return axiostInstance[requestType];
}
