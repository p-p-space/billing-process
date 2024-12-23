// Internal app
import { headersKey } from './constans';
import type { RequestContent } from '@/interfaces';
import { manageBrowserRequest, createHttpConfig } from '@/libs';

export async function createWebRequest(requestContent: RequestContent) {
  const { pathUrl, method, dataRequest } = requestContent;
  const httpConfig = createHttpConfig();

  if (dataRequest) {
    httpConfig.headers[headersKey.appContentSecurity] = 'enc';
  }

  const requestConfig = { pathUrl, method, dataRequest, httpConfig };
  const responseWebRequest = await manageBrowserRequest(requestConfig);

  const { data } = responseWebRequest;
  const { code, message, payload } = data;
  console.log({ code, message });

  return payload;
}
