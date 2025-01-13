import { AppSettings, AvailableTenants } from '@/interfaces';

const customerTenant = 'pm' as AvailableTenants;

export const settings = {
  tenant: customerTenant,
  tenantTheme: customerTenant,
  tenantImages: customerTenant,
  tenantDictionary: customerTenant,
  tenantCognitoClientId: '5rdii0er2hvj09gv3temrnluf4',
  tenantCognitoClientSecret: '1sfj8bp9281n2h7otpspff2df34njsfrmtcj6u28l1mv3t54qvmi',
} as AppSettings;
