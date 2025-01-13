import { z } from 'zod';
// Internal App
import { appSettings } from '@/constans';

const allowedtenantsSchema = z.enum(appSettings.allowedTenants);
const availableTenantsSchema = z.enum(appSettings.availableTenants);
const availableLangsSchema = z.enum(appSettings.availableLangs);
const langDataSchema = z.record(z.record(z.string()));
const langFilesSchema = z.record(z.array(z.string()));
const reqResBodySchema = z.record(z.unknown());
const appSettingsSchema = z.object({
  tenant: availableTenantsSchema,
  tenantTheme: availableTenantsSchema,
  tenantImages: availableTenantsSchema,
  tenantDictionary: availableTenantsSchema,
  tenantId: z.string(),
  tenantClientId: z.string(),
  tenantClientSecret: z.string(),
  tenantCognitoRegion: z.string(),
  tenantCognitoClientId: z.string(),
  tenantCognitoClientSecret: z.string(),
});
const stringMapSchema = z.record(z.string(), z.string());

export const appSchemas = {
  allowedTenants: allowedtenantsSchema,
  availableTenants: availableTenantsSchema,
  availableLangs: availableLangsSchema,
  langData: langDataSchema,
  langFiles: langFilesSchema,
  reqResBody: reqResBodySchema,
  appSettings: appSettingsSchema,
  stringMap: stringMapSchema,
};
