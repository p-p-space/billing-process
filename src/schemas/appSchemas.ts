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
  redisHost: z.string(),
  redisPort: z.number(),
  redisDb: z.number(),
  redisSsl: z.string(),
  redisUser: z.string(),
  redisPassword: z.string(),
  redisPrefix: z.string(),
  redisExp: z.number(),
  tenantPwa: availableTenantsSchema,
  tenantTheme: availableTenantsSchema,
  tenantImages: availableTenantsSchema,
  tenantDictionary: availableTenantsSchema,
  tenantId: z.string(),
  tenantClientId: z.string(),
  tenantClientSecret: z.string(),
  cognitoRegion: z.string(),
  cognitoUserPoolId: z.string(),
  cognitoClientId: z.string(),
  cognitoClientSecret: z.string(),
  cognitoAccessKeyId: z.string(),
  cognitoSecretAccessKey: z.string(),
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
const envSettingsSchema = z.record(tenantSettingsSchema);
const stringMapSchema = z.record(z.string(), z.string());

export const appSchemas = {
  allowedTenants: allowedtenantsSchema,
  availableTenants: availableTenantsSchema,
  availableLangs: availableLangsSchema,
  langData: langDataSchema,
  langFiles: langFilesSchema,
  reqResBody: reqResBodySchema,
  tenantSettings: tenantSettingsSchema,
  envSettings: envSettingsSchema,
  stringMap: stringMapSchema,
};
