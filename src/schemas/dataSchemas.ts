import { z } from 'zod';

const codeRegex = /^codeHttp\.\d{2}\.\d{3}$/;

export const httpConfigSchema = z.object({
  timeout: z.number().optional(),
  headers: z.record(z.union([z.string(), z.null()])),
});

export const requestBodySchema = z.record(z.unknown());

export const webRequestSchema = z.object({
  pathUrl: z.string(),
  method: z.enum(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']),
  dataRequest: requestBodySchema.optional(),
});

export const requestContentSchema = webRequestSchema.extend({
  httpConfig: httpConfigSchema,
});

export const responseApiSchema = z.object({
  code: z.string().regex(codeRegex, { message: 'code format should be codeHttp.00.000' }),
  message: z.string(),
  info: z.string().optional(),
  datetime: z.string().datetime(),
  payload: z.unknown().optional(),
  error: z.unknown().optional(),
});

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export const servRequestSchema = webRequestSchema.extend({
  axiosConfig: httpConfigSchema,
});

export const appRequestSchema = servRequestSchema.extend({
  originPath: z.string(),
});
