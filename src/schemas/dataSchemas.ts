import { z } from 'zod';

const codeRegex = /^codeHttp\.\d{2}\.\d{3}$/;

export const requestBodySchema = z.record(z.unknown());

export const axiosConfigSchema = z.object({
  timeout: z.number().optional(),
  headers: z.record(z.union([z.string(), z.null()])),
});

export const webRequestSchema = z.object({
  method: z.enum(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']),
  pathUrl: z.string(),
  dataRequest: requestBodySchema.optional(),
});

export const servRequestSchema = webRequestSchema.extend({
  axiosConfig: axiosConfigSchema,
});

export const appRequestSchema = servRequestSchema.extend({
  originPath: z.string(),
});

export const responseApiSchema = z.object({
  code: z.string().regex(codeRegex, { message: 'code format should be codeHttp.00.000' }),
  message: z.string(),
  info: z.string().optional(),
  datetime: z.string().datetime(),
  payload: z.unknown().optional(),
  error: z.unknown().optional(),
});
