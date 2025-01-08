import { Tenant } from '@/interfaces';

const tenant: Tenant = 'bt';
export const defaultTenant: Tenant = (process.env.TENANT_DEFAULT as Tenant) ?? tenant;

export const availableThemes: Tenant[] = (process.env.AVAILABLE_THEMES?.split(',').map((tenant) =>
  tenant.trim()
) as Tenant[]) ?? [tenant];

export const availableTenants: Tenant[] = (process.env.AVAILABLE_TENANTS?.split(',').map((tenant) =>
  tenant.trim()
) as Tenant[]) ?? [tenant];
