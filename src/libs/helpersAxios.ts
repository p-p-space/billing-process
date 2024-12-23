import type { HeaderConfig, HttpConfig } from '@/interfaces';
import { headersKey } from '@/utils/constans';

export function createHttpConfig(config?: HeaderConfig): HttpConfig {
  const httpConfig: HttpConfig = {
    headers: {},
  };

  if (config?.timeout) {
    const { timeout } = config;
    httpConfig.timeout = timeout;
  }

  if (config?.headers) {
    const { headers } = config;
    Object.values(headersKey).forEach((header) => {
      httpConfig.headers[header] = headers.get(header);
    });
  }

  return httpConfig;
}
