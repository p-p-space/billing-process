import { z } from 'zod';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// Internal app
import { langs } from '@/i18n';
import {
  responseApiSchema,
  httpConfigSchema,
  requestContentSchema,
  requestTypeSchema,
  errorResponseApiSchema,
} from '@/schemas';

/**
 * Represents the data structure for http configuration.
 */
export type HttpConfig = z.infer<typeof httpConfigSchema>;

/**
 * Represents the strcture for create Http config.
 */
export type HeaderConfig = {
  timeout?: HttpConfig['timeout'];
  headers?: Headers;
};

/**
 * Represents the data structure for request type.
 */
export type RequestType = z.infer<typeof requestTypeSchema>;

/**
 * Represents the data structure for request content.
 */
export type RequestContent = z.infer<typeof requestContentSchema>;

/**
 * Represents the data structure for api response.
 */
export type ResponseApi = z.infer<typeof responseApiSchema>;

/**
 * Represents the data structure for api response.
 */
export type ErrorResponseApi = z.infer<typeof errorResponseApiSchema>;

/**
 * Represents the layout of the root component.
 *
 * @typeParam children - The child components to be rendered within the layout.
 */
export type RootLayout = {
  children?: React.ReactNode;
};

/**
 * Represents a language from the available languages.
 */
export type Lang = (typeof langs)[number];

/**
 * Represents the data structure for language data.
 */
export type LangData = {
  [key: string]: Record<string, string>;
};

/**
 * Represents the structure for language files.
 */
export type LangFiles = {
  [key: string]: string[];
};

/**
 * Represents the options for configuring a cookie.
 */
export type CookieOptions = Pick<ResponseCookie, 'name' | 'value' | 'path' | 'sameSite' | 'expires'>;

/**
 * Represents the response containing cookie values.
 */
export type CookieValues = {
  cookieContent: ResponseCookie;
};
