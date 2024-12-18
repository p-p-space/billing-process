import { z } from 'zod';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// Internal app
import { langs } from '@/i18n';
import { webRequestSchema, responseApiSchema, servRequestSchema } from '@/schemas';

/**
 * Represents the layout of the root component.
 *
 * @typeParam children - The child components to be rendered within the layout.
 * @typeParam params.lang - The language parameter.
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

/**
 * Represents the data structure for body data.
 */
export type RequestBody = {
  [key: string]: string;
};

/**
 * Represents the data structure for axios web request.
 */
export type WebRequest = z.infer<typeof webRequestSchema>;

/**
 * Represents the data structure for axios services request.
 */
export type ServRequest = z.infer<typeof servRequestSchema>;

/**
 * Represents the data structure for api response.
 */
export type ResponseApi = z.infer<typeof responseApiSchema>;
