import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
// Internal app
import { TenantStore } from '@/interfaces';
import { defaultTenant, tenantPrefix } from '@/constans';

const storeApi: StateCreator<TenantStore, [['zustand/devtools', never]]> = (set) => ({
  tenantSett: {
    sessExpTime: 0,
    sessResetTime: 0,
    tenant: defaultTenant,
    tenantImages: defaultTenant,
    tenantPwa: defaultTenant,
    tenantUri: `${tenantPrefix}${defaultTenant}`,
    webUrl: '',
  },
  setTenantSett: (tenantSett) => set(() => ({ tenantSett }), false, 'setTenantSett'),
});

export const useTenantStore = create<TenantStore>()(devtools(storeApi, { name: 'TenantStore' }));
