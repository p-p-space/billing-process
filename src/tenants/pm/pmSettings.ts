import { SettingsApp, Tenant } from '@/interfaces';

const customerTenant = 'pm' as Tenant;

export const settings = {
  tenant: customerTenant,
  tenantTheme: customerTenant,
  tenantImages: customerTenant,
  tenantDictionary: customerTenant,
} as SettingsApp;
