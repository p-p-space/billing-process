import { isAxiosError } from 'axios';
// Internal App
import { browserAxios } from '@/libs';
import { WebRequest } from '@/interfaces';
import { webRequestSchema } from '@/schemas';

export async function manageClientRequest(webRequest: WebRequest) {
  const parsedData = webRequestSchema.safeParse(webRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid web request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, url, formData } = parsedData.data;

  try {
    const { data } = await browserAxios[method](url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
