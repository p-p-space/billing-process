import * as store from '@/store';

export function useInitStates() {
  const resetRouteStore = store.useRoutesStore((state) => state.resetRouteStore);
  const resetUserStore = store.useUserStore((state) => state.resetUserStore);
  const resetSessStore = store.useSessionStorage((state) => state.resetSessStore);
  const { sessResetTime } = store.useTenantStore((state) => state.tenantSett);

  const initStates = () => {
    resetUserStore();
    resetSessStore(sessResetTime);
    resetRouteStore();
  };

  return { initStates };
}
