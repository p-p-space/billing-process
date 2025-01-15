import { z } from 'zod';
import type { NextResponse } from 'next/server';
// Internal App
import type { httpSchemas } from '@/schemas';

/**
 * Represents the configuration for an HTTP request.
 */
export type HttpConfig = z.infer<typeof httpSchemas.httpConfig>;

/**
 * Configuration for HTTP headers and timeout.
 */
export type HeaderConfig = {
  timeout?: HttpConfig['timeout'];
  headers?: Headers;
};

/**
 * Represents the content of an HTTP request.
 */
export type RequestContent = z.infer<typeof httpSchemas.requestContent>;

/**
 * Represents the content of an HTTP axios request.
 */
export type RequestAxios = z.infer<typeof httpSchemas.requestAxios>;

/**
 * Represents the type of an HTTP request.
 */
export type RequestType = z.infer<typeof httpSchemas.requestType>;

/**
 * Represents the structure of a response from the API.
 */
export type ResponseApi = z.infer<typeof httpSchemas.responseApi>;

/**
 * Represents the structure of an error response from the API.
 */
export type ErrorResponseApi = z.infer<typeof httpSchemas.errorResponseApi>;

/**
 * Represents a promise that resolves to a Next.js response containing either a successful API response or an error response.
 */
export type ApiResponsePromise = Promise<NextResponse<ResponseApi>>;
