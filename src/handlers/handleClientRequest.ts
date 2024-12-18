import { isAxiosError } from 'axios';
// Internal App
import { browserAxios } from '@/libs';
import { AxiosConfig, WebRequest } from '@/interfaces';
import { webRequestSchema } from '@/schemas';
import { appBodyContent, baseAppURL, pathServ } from '@/utils/constans';

export async function manageClientRequest(webRequest: WebRequest) {
  const parsedData = webRequestSchema.safeParse(webRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid web request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, pathUrl, dataRequest } = parsedData.data;
  const url = `${baseAppURL}${pathServ}${pathUrl}`;
  const axiosConfig: AxiosConfig = {
    timeout: 59800,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  axiosConfig.headers[appBodyContent] = !!dataRequest;

  try {
    const { data } = await browserAxios[method](url, dataRequest, axiosConfig);
    const { code, message } = data;
    console.log({ code, message });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
