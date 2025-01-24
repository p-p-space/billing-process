import { z } from 'zod';
// Internal App
import { appSettings } from '@/constans';

const allowedtenantsSchema = z.enum(appSettings.allowedTenants);
const availableTenantsSchema = z.enum(appSettings.availableTenants);
const availableLangsSchema = z.enum(appSettings.availableLangs);
const langDataSchema = z.record(z.record(z.string()));
const langFilesSchema = z.record(z.array(z.string()));
const reqResBodySchema = z.record(z.unknown());
const tenantSettingsSchema = z.object({
  webUrl: z.string(),
  servUrl: z.string(),
  timeZone: z.string(),
  tenant: availableTenantsSchema,
  tenantTheme: availableTenantsSchema,
  tenantImages: availableTenantsSchema,
  tenantDictionary: availableTenantsSchema,
  tenantId: z.string(),
  tenantClientId: z.string(),
  tenantClientSecret: z.string(),
  cognitoRegion: z.string(),
  cognitoClientId: z.string(),
  cognitoClientSecret: z.string(),
  secJweStr: z.string(),
  secJwsStr: z.string(),
  webJwePrivKey: z.string(),
  webJwePubKey: z.string(),
  webJwsPrivKey: z.string(),
  webJwsPubKey: z.string(),
  servJwePrivKey: z.string(),
  servJwePubKey: z.string(),
  servJwsPrivKey: z.string(),
  servJwsPubKey: z.string(),
});
const stringMapSchema = z.record(z.string(), z.string());

export const appSchemas = {
  allowedTenants: allowedtenantsSchema,
  availableTenants: availableTenantsSchema,
  availableLangs: availableLangsSchema,
  langData: langDataSchema,
  langFiles: langFilesSchema,
  reqResBody: reqResBodySchema,
  tenantSettings: tenantSettingsSchema,
  stringMap: stringMapSchema,
};
