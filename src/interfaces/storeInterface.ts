import { Tenant } from './appInterface';

export type TenantStore = {
  tenant: Tenant;
  setTenant: (tenant: Tenant) => void;
};
