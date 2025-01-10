import { z } from 'zod';

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
