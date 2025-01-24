import uuid4 from 'uuid4';
import { useCallback } from 'react';
import { isAxiosError } from 'axios';
// Internal App
import { headersKey } from '@/constans';
import type { RequestContent } from '@/interfaces';
import { useTenantStore, useUiStore } from '@/store';
import { createHttpConfig, manageRequest } from '@/libs/axios';

export function useBrowserRequest(loading = true) {
  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);
  const tenant = useTenantStore((state) => state.tenant);

  const createBrowserRequest = useCallback(
    async (requestContent: RequestContent) => {
      const { pathUrl, method, ...data } = requestContent;
      let { dataRequest } = data;
      const httpConfig = createHttpConfig();
      httpConfig.headers[headersKey.AppReqId] = uuid4();
      httpConfig.headers[headersKey.appTenant] = tenant;

      if (dataRequest) {
        dataRequest = { payload: dataRequest };
        httpConfig.headers[headersKey.appContentSecurity] = 'enc';
      }

      try {
        setLoadingScreen(loading);
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
    [loading, setLoadingScreen, tenant]
  );

  return {
    createBrowserRequest,
  };
}
