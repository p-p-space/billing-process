// Internal app
import { headersKey } from './constans';
import { WebRequest } from '@/interfaces';
import { createHttpConfig } from './toolHelpers';
import manageBrowserRequest from '@/libs/webAxiosConfig';

export async function createWebRequest(webRequest: WebRequest) {
  const { pathUrl, method, dataRequest } = webRequest;
  const httpConfig = createHttpConfig({});

  httpConfig.headers[headersKey.appContentSecurity] = dataRequest ? 'enc' : null;

  const requestConfig = { method, pathUrl, dataRequest, httpConfig };

  const responseWebRequest = await manageBrowserRequest(requestConfig);

  const { data } = responseWebRequest;
  const { code, message, payload } = data;
  console.log({ code, message });

  return payload;
}
