import { useCallback } from 'react';
import { isAxiosError } from 'axios';
// Internal app
import { useUiStore } from '@/store';
import { headersKey } from '@/utils/constans';
import type { RequestContent } from '@/interfaces';
import { createHttpConfig, manageRequest } from '@/libs';

export function useBrowserRequest() {
  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const createBrowserRequest = useCallback(
    async (requestContent: RequestContent) => {
      const { pathUrl, method, dataRequest } = requestContent;
      const httpConfig = createHttpConfig();

      if (dataRequest) {
        httpConfig.headers[headersKey.appContentSecurity] = 'enc';
      }

      setLoadingScreen(true);
      try {
        const requestConfig = { pathUrl, method, dataRequest, httpConfig };
        const requestType = 'browser';
        const responseWebRequest = await manageRequest(requestConfig, requestType);
        const { data, status } = responseWebRequest;
        const { message, payload } = data;
        console.log('createBrowserRequest:', { data, status });

        setLoadingScreen(false);

        if (status < 200 || status >= 300) {
          throw new Error(message);
        }

        return payload;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          throw error.response.data.message;
        }

        const errorResponse = error as Error;

        throw errorResponse.message;
      }
    },
    [setLoadingScreen]
  );

  return {
    createBrowserRequest,
  };
}
