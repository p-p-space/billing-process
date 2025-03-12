import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
// Internal app
import { SessionStorage } from '@/interfaces';
import { useTenantStore } from './useTenantStore';

const StoreSession: StateCreator<SessionStorage, [['zustand/devtools', never]]> = (set) => ({
  sessReset: 0,
  showModal: false,
  timeLeft: useTenantStore.getState().tenantSett.sessResetTime ?? 0,
  setSessReset: (reset) =>
    set(
      () => {
        const { sessExpTime, sessResetTime = 0 } = useTenantStore.getState().tenantSett;
        const sessReset = reset ?? (sessExpTime - sessResetTime) * 1000;
        return { sessReset };
      },
      false,
      'setsessReset'
    ),
  setShowModal: (show) => set((state) => ({ ...state, showModal: show }), false, 'setShowModal'),
  setTimeLeft: (time) => set((state) => ({ ...state, timeLeft: time }), false, 'setTimeLeft'),
});

export const useSessionStorage = create<SessionStorage>()(
  devtools(
    persist(StoreSession, {
      name: 'session-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
