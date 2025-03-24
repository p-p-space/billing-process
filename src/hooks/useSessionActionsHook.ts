import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
// Internal app
import { apiPaths } from '@/constans';
import { RequestContent } from '@/interfaces';
import { useBrowserRequest } from './useBrowserRequestHook';
import { useSessionStorage } from '@/store/useSessionStorage';
import { useRoutesStore, useTenantStore, useUiStore } from '@/store';

export function useSessionActions() {
  const { push } = useRouter();
  const closeModal = useUiStore((state) => state.closeModal);
  const setSessReset = useSessionStorage((state) => state.setSessReset);
  const setShowModal = useSessionStorage((state) => state.setShowModal);
  const { createBrowserRequest } = useBrowserRequest();
  const setTimeLeft = useSessionStorage((state) => state.setTimeLeft);
  const { tenantUri, sessResetTime = 0 } = useTenantStore((state) => state.tenantSett);
  const setRoute = useRoutesStore((state) => state.setRoute);

  const { mutate } = useMutation({
    mutationFn: (request: RequestContent) => {
      closeModal();
      setShowModal(false);
      setTimeLeft(sessResetTime);
      return createBrowserRequest(request);
    },
  });

  const signout = useCallback(() => {
    const dataSignout: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/signout`,
      method: 'get',
    };

    setSessReset(0);
    mutate(dataSignout, {
      onSettled: () => {
        sessionStorage.clear();
        localStorage.clear();
        setRoute('loginRoute', 'login');
        push(`/${tenantUri}/signin`);
      },
    });
  }, [mutate, push, setRoute, setSessReset, tenantUri]);

  const refresh = useCallback(() => {
    const dataRefresh: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/refresSesion`,
      method: 'get',
    };

    mutate(dataRefresh);
  }, [mutate]);

  return { refresh, signout };
}
