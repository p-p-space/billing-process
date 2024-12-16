import { isAxiosError } from 'axios';
// Internal App
import { DataRequest } from '@/interfaces';
import { httpClientInstance } from '@/libs';
import { dataRequestSchema } from '@/schemas';

export async function handleClientRequest(dataRequest: DataRequest) {
  const parsedData = dataRequestSchema.safeParse(dataRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid data request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, url, formData } = parsedData.data;

  try {
    const response = await httpClientInstance[method](url, formData);

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
