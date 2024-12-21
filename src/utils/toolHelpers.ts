import { HeaderConfig, HttpConfig } from '@/interfaces';
import { headersKey } from './constans';

export function createHttpConfig({ timeout, headers }: HeaderConfig): HttpConfig {
  const httpConfig: HttpConfig = {
    headers: {},
  };

  if (timeout) {
    httpConfig.timeout = timeout;
  }

  if (headers) {
    Object.values(headersKey).forEach((header) => {
      httpConfig.headers[header] = headers.get(header);
    });
  }

  return httpConfig;
}
