import { isAxiosError } from 'axios';
// Internal App
import { browserAxios } from '@/libs';
import { DataRequest } from '@/interfaces';
import { dataRequestSchema } from '@/schemas';

export async function manageClientRequest(dataRequest: DataRequest) {
  const parsedData = dataRequestSchema.safeParse(dataRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid data request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, url, formData } = parsedData.data;

  try {
    const response = await browserAxios[method](url, formData);

    if (response.data) {
      const { code, message } = response.data;
      console.log({ code, message });
    }

    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
