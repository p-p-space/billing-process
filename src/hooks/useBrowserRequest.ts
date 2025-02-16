import uuid4 from 'uuid4';
import { useCallback } from 'react';
import { isAxiosError } from 'axios';
// Internal app
import { headersKey } from '@/constans';
import { useTenantStore, useUiStore } from '@/store';
import { createHttpConfig, manageRequest } from '@/libs/axios';
import type { RequestAxios, RequestContent } from '@/interfaces';

export function useBrowserRequest(loading = true) {
  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);
  const { tenant } = useTenantStore((state) => state.tenantSett);

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
        const requestConfig: RequestAxios = { pathUrl, method, dataRequest, httpConfig };
        const requestType = 'browser';
        const responseWebRequest = await manageRequest(requestConfig, requestType);
        const { data, status } = responseWebRequest;
        const { code } = data;

        if (status < 200 || status >= 300) {
          throw new Error(code);
        }

        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          throw error.response.data.message;
        }

        const errorResponse = error as Error;

        throw errorResponse.message;
      } finally {
        setLoadingScreen(false);
      }
    },
    [loading, setLoadingScreen, tenant]
  );

  return {
    createBrowserRequest,
  };
}
