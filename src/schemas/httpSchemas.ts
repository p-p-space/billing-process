import { z } from 'zod';
// Internal App
import { appSchema } from './appSchemas';

const codeRegex = /^codeHttp\.\d{2}\.\d{3}$/;

const httpConfigSchema = z.object({
  timeout: z.number(),
  headers: z.record(z.string(), z.string()),
  validateStatus: z.function().args(z.number()).returns(z.boolean()),
  withCredentials: z.boolean(),
});
const responseApiSchema = z.object({
  code: z.string().regex(codeRegex, { message: 'code format should be codeHttp.00.000' }),
  message: z.string(),
  info: z.string().optional(),
  datetime: z.string().datetime(),
  payload: z.unknown().optional(),
  content: z.unknown().optional(),
});

export const httpSchema = {
  reqResBody: appSchema.reqResBody,
  responseApi: responseApiSchema,
  requestType: z.enum(['browser', 'application', 'services']),
  httpConfig: httpConfigSchema,
  requestContent: z.object({
    pathUrl: z.string(),
    method: z.enum(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']),
    dataRequest: appSchema.reqResBody.optional(),
    httpConfig: httpConfigSchema.optional(),
  }),
  errorResponseApi: z.object({
    status: z.number(),
    data: responseApiSchema.pick({ code: true, message: true }),
  }),
};
