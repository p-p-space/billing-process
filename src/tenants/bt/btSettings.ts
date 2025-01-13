import { defaultTenant } from '@/constans';
import type { AppSettings } from '@/interfaces';

export const defaultSettings: AppSettings = {
  tenant: defaultTenant,
  tenantTheme: defaultTenant,
  tenantImages: defaultTenant,
  tenantDictionary: defaultTenant,
  tenantId: '4ebb4b36-11d6-462b-a7de-deecbffb0f71',
  tenantClientId: 'oa0eaqpiDT7BK6fvKP36PNUSHiWAeRdb',
  tenantClientSecret: 'UH8q0OwvkXrRdI3x',
  tenantCognitoRegion: 'us-east-1',
  tenantCognitoClientId: '5se5vueiulffn56c91u02lrmua',
  tenantCognitoClientSecret: 'f2nmuhunsjk6relkcvn1inpmfi7n6et6afmfjo3dq6b6g7s6cli',
};
