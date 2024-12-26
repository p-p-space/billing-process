// Internal app
import { headersKey } from '@/utils/constans';
import type { RequestContent } from '@/interfaces';
import { createHttpConfig, manageRequest } from '@/libs';
import { isAxiosError } from 'axios';

export async function createBrowserRequest(requestContent: RequestContent) {
  const { pathUrl, method, dataRequest } = requestContent;
  const httpConfig = createHttpConfig();

  if (dataRequest) {
    httpConfig.headers[headersKey.appContentSecurity] = 'enc';
  }

  try {
    const requestConfig = { pathUrl, method, dataRequest, httpConfig };
    const requestType = 'browser';
    const responseWebRequest = await manageRequest(requestConfig, requestType);
    const { data, status } = responseWebRequest;
    const { code, message, payload } = data;
    console.log({ code, message });

    if (status >= 400 && status <= 500) {
      throw new Error(message);
    }

    return payload;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }

    const errorResponse = error as Error;

    throw errorResponse.message;
  }
}
