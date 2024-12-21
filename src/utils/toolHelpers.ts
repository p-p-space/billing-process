import { AxiosConfig } from '@/interfaces';
import { headersKey } from './constans';

export function createAxiosConfig({ timeout, headers }: { timeout?: number; headers?: Headers }): AxiosConfig {
  const axiosConfig: AxiosConfig = {
    headers: {},
  };

  if (timeout) {
    axiosConfig.timeout = timeout;
  }

  if (headers) {
    Object.values(headersKey).forEach((header) => {
      axiosConfig.headers[header] = headers.get(header) ?? null;
    });
  }

  return axiosConfig;
}
