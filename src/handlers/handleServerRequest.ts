import { isAxiosError } from 'axios';
// Internal App
import { serverAxios } from '@/libs';
import { ServRequest } from '@/interfaces';
import { servRequestSchema } from '@/schemas';

export async function manageServerRequest(servRequest: ServRequest) {
  const parsedData = servRequestSchema.safeParse(servRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid server request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, url, dataRequest, axiosConfig } = parsedData.data;

  try {
    const { data } = await serverAxios[method](url, dataRequest, axiosConfig);

    if (data?.message) {
      const { code, message } = data;
      console.log({ code, message });
    }

    console.log({ data });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    console.error(error);
  }
}
