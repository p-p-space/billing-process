import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
// Internal app
import { apiPaths } from '@/constans';
import { RequestContent } from '@/interfaces';
import { useBrowserRequest } from './useBrowserRequest';
import { useRoutesStore, useSessionStorage, useTenantStore, useUiStore } from '@/store';

export function useSessionControl(external: boolean = false) {
  const t = useTranslations();
  const { push } = useRouter();
  const closeModal = useUiStore((state) => state.closeModal);
  const setModal = useUiStore((state) => state.setModal);
  const setSessReset = useSessionStorage((state) => state.setSessReset);
  const setShowModal = useSessionStorage((state) => state.setShowModal);
  const { createBrowserRequest } = useBrowserRequest();
  const { tenantUri, sessResetTime = 0 } = useTenantStore((state) => state.tenantSett);
  const sessReset = useSessionStorage((state) => state.sessReset);
  const showModal = useSessionStorage((state) => state.showModal);
  const setRoute = useRoutesStore((state) => state.setRoute);
  const modalTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const sessTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const intervalTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeLeft, setTimeLeft] = useState(sessResetTime);

  const clearTimers = useCallback(
    (clear: string) => {
      if (clear === 'modalTimer' || (modalTimer.current && showModal)) {
        clearTimeout(modalTimer.current);
        modalTimer.current = undefined;
      }

      if (clear === 'sessTimer' && sessTimer.current && !showModal) {
        clearTimeout(sessTimer.current);
        sessTimer.current = undefined;
      }

      if (clear === 'intervalTimer' && intervalTimer.current) {
        clearInterval(intervalTimer.current);
        intervalTimer.current = undefined;
      }
    },
    [showModal]
  );

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

    if (external) {
      setRoute('loginRoute', 'login');
    }

    setSessReset(0);
    mutate(dataSignout, {
      onSettled: () => {
        push(`/${tenantUri}/signin`);
      },
    });
  }, [external, mutate, push, setRoute, setSessReset, tenantUri]);

  const refresh = useCallback(() => {
    const dataRefresh: RequestContent = {
      pathUrl: `${apiPaths.appBrowserApi}/refresSesion`,
      method: 'get',
    };

    mutate(dataRefresh);
  }, [mutate]);

  useEffect(() => {
    let show = showModal;

    if (showModal && !sessTimer.current) {
      show = false;
      setShowModal(false);
      setTimeLeft(sessResetTime);
    }

    if (show) {
      intervalTimer.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalTimer.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setModal({
        title: t('common.inactivityTitle', { username: 'usuario' }),
        description: t('common.inactivityMessage', { time: timeLeft }),
        actions: [
          {
            text: t('common.sessKeep'),
            variant: 'text',
            onClick: () => {
              refresh();
            },
          },
          {
            text: t('menu.logOut'),
            variant: 'text',
            onClick: () => {
              signout();
            },
          },
        ],
      });
    }

    return () => {
      clearTimers('intervalTimer');
    };
  }, [clearTimers, refresh, sessResetTime, setModal, setShowModal, showModal, signout, t, timeLeft]);

  useEffect(() => {
    clearTimers('sessTimer');
    if (sessReset > 0 && !showModal) {
      modalTimer.current = setTimeout(() => {
        setShowModal(true);
        sessTimer.current = setTimeout(() => {
          signout();
        }, sessResetTime * 1000);
      }, sessReset);
    }

    return () => {
      clearTimers('modalTimer');
    };
  }, [clearTimers, sessReset, sessResetTime, setShowModal, showModal, signout]);

  return { signout };
}
