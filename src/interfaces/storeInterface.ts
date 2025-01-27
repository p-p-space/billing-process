import { Tenant, TenantSettings } from './appInterface';

export type TenantStore = {
  tenant: Tenant;
  tenantSett: { tenant: Tenant; tenantImages: TenantSettings['tenantImages']; webUrl: TenantSettings['webUrl'] };
  setTenant: (tenant: Tenant) => void;
  setTenantSett: (tenantSett: TenantStore['tenantSett']) => void;
};
