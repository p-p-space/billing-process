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

    return response;
  } catch (error) {
    throw new Error(`handleClientRequest error: ${(error as Error).message}`);
  }
}
