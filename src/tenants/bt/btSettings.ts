import { defaultTenant } from '@/constans';
import { SettingsApp } from '@/interfaces';

export const defaultSettings = {
  tenant: defaultTenant,
  tenantTheme: defaultTenant,
  tenantImages: defaultTenant,
  tenantDictionary: defaultTenant,
} as SettingsApp;
