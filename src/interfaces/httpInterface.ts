import { z } from 'zod';
import type { NextResponse } from 'next/server';
// Internal app
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
export type HttpRequest = z.infer<typeof httpSchemas.httpRequest>;

/**
 * Represents the type of an HTTP request.
 */
export type RequestType = z.infer<typeof httpSchemas.requestType>;

/**
 * Represents the structure of a response from the API.
 */
export type ResponseApi = z.infer<typeof httpSchemas.responseApi>;
export type ApiRespObj = {
  code: ResponseApi['code'];
  message: ResponseApi['message'];
  [x: string]: unknown;
};

/**
 * Represents the structure of an error response from the API.
 */
export type ErrorResponseApi = z.infer<typeof httpSchemas.errorResponseApi>;

/**
 * Represents the structure of an error response from the client.
 */
export type ErrorClientResp = z.infer<typeof httpSchemas.errorClientResp>;

/**
 * Represents a promise that resolves to a Next.js response containing either a successful API response or an error
 * response.
 */
export type ApiPromise = Promise<NextResponse<ResponseApi>>;

/**
 * Represents the structure of a Cognito authentication result.
 */
export type CognitoAuthResult = z.infer<typeof httpSchemas.cognitoAuthResult>;
