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

const enunSchema = ['bt', 'pm'] as const;

const tenantSchema = z.enum(enunSchema);

export const appSchema = {
  lang: z.enum(['en', 'es']),
  langData: z.record(z.record(z.string())),
  langFiles: z.record(z.array(z.string())),
  reqResBody: z.record(z.unknown()),
  settingsApp: z
    .object({
      tenant: tenantSchema,
      tenantTheme: tenantSchema,
      tenantImages: tenantSchema,
      tenantDictionary: tenantSchema,
    })
    .catchall(z.string()),
  stringMap: z.record(z.string(), z.string()),
  tenant: tenantSchema,
};
