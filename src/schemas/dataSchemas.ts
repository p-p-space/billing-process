import { z } from 'zod';

const codeRegex = /^codeHttp\.\d{2}\.\d{3}$/;

export const stringMap = z.record(z.string(), z.string());

export const tenantSchema = z.enum(['bt', 'pm']);

export const settingsApp = z.record(z.string(), tenantSchema);

export const requestBodySchema = z.record(z.unknown());

export const requestTypeSchema = z.enum(['browser', 'application', 'services']);

export const httpConfigSchema = z.object({
  timeout: z.number(),
  headers: z.record(z.string(), z.string()),
  validateStatus: z.function().args(z.number()).returns(z.boolean()),
});

export const requestContentSchema = z.object({
  pathUrl: z.string(),
  method: z.enum(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']),
  dataRequest: requestBodySchema.optional(),
  httpConfig: httpConfigSchema.optional(),
});

export const responseApiSchema = z.object({
  code: z.string().regex(codeRegex, { message: 'code format should be codeHttp.00.000' }),
  message: z.string(),
  info: z.string().optional(),
  datetime: z.string().datetime(),
  payload: z.unknown().optional(),
});

export const errorResponseApiSchema = z.object({
  status: z.number(),
  data: responseApiSchema.pick({ code: true, message: true }),
});
