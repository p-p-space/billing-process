// Iternal App
import { Tenant, TenantSettings } from '@/interfaces';
import { prefixCookieName, redisConnect, SessSettings, timeZone } from '@/constans';

const customer: Tenant = 'pm';

export const localSettings = {
  timeZone: timeZone ?? 'America/Jamaica',
  redisUser: redisConnect.user ?? 'orion214005',
  redisPassword: redisConnect.password ?? 'orion214005*novo',
  redisPrefix: customer,
  sessExpTime: parseInt(SessSettings.sessExpTime ?? '180'),
  sessCookieName: `${prefixCookieName}${customer}`,
  tenantId: '581134d0-a5dc-4930-ae60-60efa18c9f14',
  tenantClientId: '3b5FEaH7Gbkmz40Uk86Ght6cTumxxi3v',
  tenantClientSecret: 'NfIGwKwIswU3SwJD',
  cognitoUserPoolId: 'us-east-1_jdeaGHuGa',
  cognitoClientId: '5rdii0er2hvj09gv3temrnluf4',
  cognitoClientSecret: '1sfj8bp9281n2h7otpspff2df34njsfrmtcj6u28l1mv3t54qvmi',
} as TenantSettings;
