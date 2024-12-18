import { z } from 'zod';

const codeRegex = /^codeHttp\.\d{2}\.\d{3}$/;

export const webRequestSchema = z.object({
  method: z.enum(['get', 'post', 'put', 'patch', 'delete', 'options']),
  url: z.string(),
  formData: z.record(z.string()).optional(),
});

export const servRequestSchema = webRequestSchema.extend({
  originPath: z.string(),
});

export const responseApiSchema = z.object({
  code: z.string().regex(codeRegex, { message: 'code format should be codeHttp.00.000' }),
  message: z.string(),
  info: z.string().optional().optional(),
  datetime: z.string().datetime(),
  payload: z.unknown().optional(),
  error: z.unknown().optional(),
});
