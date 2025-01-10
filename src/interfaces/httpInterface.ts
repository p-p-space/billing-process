import { httpSchema } from '@/schemas';
import { z } from 'zod';

/**
 * Represents the structure of an error response from the API.
 */
export type ErrorResponseApi = z.infer<typeof httpSchema.errorResponseApi>;

/**
 * Configuration for HTTP headers and timeout.
 */
export type HeaderConfig = {
  timeout?: HttpConfig['timeout'];
  headers?: Headers;
};

/**
 * Represents the configuration for an HTTP request.
 */
export type HttpConfig = z.infer<typeof httpSchema.httpConfig>;

/**
 * Represents the content of an HTTP request.
 */
export type RequestContent = z.infer<typeof httpSchema.requestContent>;

/**
 * Represents the type of an HTTP request.
 */
export type RequestType = z.infer<typeof httpSchema.requestType>;

/**
 * Represents the structure of a response from the API.
 */
export type ResponseApi = z.infer<typeof httpSchema.responseApi>;
