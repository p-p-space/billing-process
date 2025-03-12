import { z } from 'zod';
// Internal app
import { appSchemas } from './appSchemas';

const codeRegex = /^codeHttp\.\d{2}\.\d{3}$/;
const responseApiSchema = z
  .object({
    code: z.string().regex(codeRegex, { message: 'code format should be codeHttp.00.000' }),
    message: z.string(),
    info: z.string().optional(),
    datetime: z.string().datetime().optional(),
    payload: z.unknown().optional(),
  })
  .catchall(z.unknown());
const requestTypeSchema = z.enum(['browser', 'services']);
const httpConfigSchema = z.object({
  timeout: z.number(),
  headers: z.record(z.string(), z.string()),
  validateStatus: z.function().args(z.number()).returns(z.boolean()),
  withCredentials: z.boolean(),
});
const requestContentSchema = z.object({
  pathUrl: z.string(),
  method: z.enum(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']),
  dataRequest: appSchemas.reqResBody.optional(),
});
const httpRequestSchema = requestContentSchema.extend({
  httpConfig: httpConfigSchema,
});
const errorResponseApiSchema = z.object({
  status: z.number(),
  data: responseApiSchema.pick({ code: true, message: true }),
});
const errorClientRespSchema = z.object({
  data: responseApiSchema.pick({ code: true, message: true, payload: true }),
});
const cognitoAuthResultSchema = z.object({
  AccessToken: z.string(),
  ExpiresIn: z.number(),
  IdToken: z.string(),
  RefreshToken: z.string(),
  TokenType: z.string(),
});

export const httpSchemas = {
  reqResBody: appSchemas.reqResBody,
  responseApi: responseApiSchema,
  requestType: requestTypeSchema,
  httpConfig: httpConfigSchema,
  requestContent: requestContentSchema,
  httpRequest: httpRequestSchema,
  errorResponseApi: errorResponseApiSchema,
  errorClientResp: errorClientRespSchema,
  cognitoAuthResult: cognitoAuthResultSchema,
};
