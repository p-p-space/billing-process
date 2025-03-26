import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
// Internal app
import { SessionStorage } from '@/interfaces';
import { useTenantStore } from './useTenantStore';

const sessInit = {
  sessReset: 0,
  showModal: false,
  timeLeft: useTenantStore.getState().tenantSett.sessResetTime,
};
const storeSession: StateCreator<SessionStorage, [['zustand/devtools', never]]> = (set) => ({
  ...sessInit,

  setSessReset: (reset) =>
    set(
      () => {
        const { sessExpTime, sessResetTime } = useTenantStore.getState().tenantSett;
        const sessReset = reset ?? (sessExpTime - sessResetTime) * 1000;
        return { sessReset };
      },
      false,
      'setsessReset'
    ),
  setShowModal: (show) => set(() => ({ showModal: show }), false, 'setShowModal'),
  setTimeLeft: (time) => set(() => ({ timeLeft: time }), false, 'setTimeLeft'),
  resetSessStore: (time) => set(() => ({ ...sessInit, timeLeft: time }), false, 'resetSessStore'),
});

export const useSessionStorage = create<SessionStorage>()(
  devtools(
    persist(storeSession, {
      name: 'session-storage',
      storage: createJSONStorage(() => sessionStorage),
    }),
    { name: 'sessionStore' }
  )
);
