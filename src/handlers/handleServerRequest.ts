import { isAxiosError } from 'axios';
// Internal App
import { serverAxios } from '@/libs';
import { ServRequest } from '@/interfaces';
import { servRequestSchema } from '@/schemas';
import { baseServURL } from '@/utils/constans';

export async function manageServerRequest(servRequest: ServRequest) {
  const parsedData = servRequestSchema.safeParse(servRequest);

  if (!parsedData.success) {
    throw new Error(`Invalid server request: ${JSON.stringify(parsedData.error)}`);
  }

  const { method, pathUrl, dataRequest, axiosConfig } = parsedData.data;
  const url = `${baseServURL}${pathUrl}`;

  try {
    const response = await serverAxios({ url, method, data: dataRequest, ...axiosConfig });
    const { data } = response;

    if (data?.message) {
      const { code, message } = data;
      console.log({ code, message });
    }

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    console.error(error);
  }
}
