// Internal App
import { webEnv } from '@/constans';
import { credentials } from './pmCredentials';
import type { AppSettings, Tenant } from '@/interfaces';

const customerTenant = 'pm' as Tenant;

export const settings = {
  tenant: customerTenant,
  tenantTheme: customerTenant,
  tenantImages: customerTenant,
  tenantDictionary: customerTenant,
  tenantId: credentials[webEnv].tenantId,
  tenantClientId: credentials[webEnv].tenantClientId,
  tenantClientSecret: credentials[webEnv].tenantClientSecret,
  cognitoClientId: credentials[webEnv].cognitoClientId,
  cognitoClientSecret: credentials[webEnv].cognitoClientSecret,
} as AppSettings;
