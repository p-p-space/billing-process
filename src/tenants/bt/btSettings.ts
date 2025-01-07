import { SettingsApp, Tenant } from '@/interfaces';

export const defaultTenant = (process.env.TENANT_DEFAULT as Tenant) ?? 'bt';

export const defaultSettings = {
  tenant: defaultTenant,
  tenantTheme: defaultTenant,
  tenantImages: defaultTenant,
  Tenantdictionary: defaultTenant,
} as SettingsApp;
