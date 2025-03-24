import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef } from 'react';
// Internal app
import { useTenantStore, useUiStore } from '@/store';
import { useSessionActions } from './useSessionActionsHook';
import { useSessionStorage } from '@/store/useSessionStorage';

export function useSessionControl() {
  const t = useTranslations();
  const { refresh, signout } = useSessionActions();
  const setModal = useUiStore((state) => state.setModal);
  const setShowModal = useSessionStorage((state) => state.setShowModal);
  const { sessResetTime = 0 } = useTenantStore((state) => state.tenantSett);
  const sessReset = useSessionStorage((state) => state.sessReset);
  const showModal = useSessionStorage((state) => state.showModal);
  const timeLeft = useSessionStorage((state) => state.timeLeft);
  const setTimeLeft = useSessionStorage((state) => state.setTimeLeft);
  const modalTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const sessTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const intervalTimer = useRef<NodeJS.Timeout | undefined>(undefined);

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

  useEffect(() => {
    let show = showModal;

    if (showModal && !sessTimer.current) {
      show = false;
      setShowModal(false);
      setTimeLeft(sessResetTime);
    }

    if (show) {
      intervalTimer.current = setInterval(() => {
        setTimeLeft(timeLeft - 1);

        if (timeLeft <= 0) {
          clearInterval(intervalTimer.current);
        }
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
  }, [clearTimers, refresh, sessResetTime, setModal, setShowModal, setTimeLeft, showModal, signout, t, timeLeft]);

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
}
