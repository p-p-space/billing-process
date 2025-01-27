import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
// Internal app
import { TenantStore } from '@/interfaces';
import { defaultTenant } from '@/constans';

const storeApi: StateCreator<TenantStore, [['zustand/devtools', never]]> = (set) => ({
  tenant: defaultTenant,
  tenantSett: { tenant: defaultTenant, webUrl: '', tenantImages: defaultTenant },
  setTenant: (tenant) => set(() => ({ tenant }), false, 'setTenant'),
  setTenantSett: (tenantSett) => set(() => ({ tenantSett }), false, 'setTenantSett'),
});

export const useTenantStore = create<TenantStore>()(devtools(storeApi));
