import type { AppSettings, Tenant } from '@/interfaces';

const customerTenant = 'pm' as Tenant;

export const settings = {
  tenant: customerTenant,
  tenantTheme: customerTenant,
  tenantImages: customerTenant,
  tenantDictionary: customerTenant,
  tenantId: '581134d0-a5dc-4930-ae60-60efa18c9f14',
  tenantClientId: '3b5FEaH7Gbkmz40Uk86Ght6cTumxxi3v',
  tenantClientSecret: 'NfIGwKwIswU3SwJD',
  tenantCognitoClientId: '5rdii0er2hvj09gv3temrnluf4',
  tenantCognitoClientSecret: '1sfj8bp9281n2h7otpspff2df34njsfrmtcj6u28l1mv3t54qvmi',
} as AppSettings;
