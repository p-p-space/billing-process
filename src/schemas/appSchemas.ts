import { z } from 'zod';

const tenantSchema = z.enum(['bt', 'pm']);

export const appSchema = {
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
