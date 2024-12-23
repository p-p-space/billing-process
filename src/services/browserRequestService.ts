// Internal app
import { headersKey } from '@/utils/constans';
import type { RequestContent } from '@/interfaces';
import { manageBrowserRequest, createHttpConfig } from '@/libs';
import { isAxiosError } from 'axios';

export async function createBrowserRequest(requestContent: RequestContent) {
  const { pathUrl, method, dataRequest } = requestContent;
  const httpConfig = createHttpConfig();

  if (dataRequest) {
    httpConfig.headers[headersKey.appContentSecurity] = 'enc';
  }

  try {
    const requestConfig = { pathUrl, method, dataRequest, httpConfig };
    const responseWebRequest = await manageBrowserRequest(requestConfig);

    const { data } = responseWebRequest;
    const { code, message, payload } = data;
    console.log({ code, message });

    return payload;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response;
    }

    throw error;
  }
}
