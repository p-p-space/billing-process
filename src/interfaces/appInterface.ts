import { z } from 'zod';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// Internal App
import { appSchemas } from '@/schemas';
import { defaultTenant } from '@/constans';

/**
 * example for constants as type
 */
export const exampleString = 'example';
export type ExampleString = typeof exampleString;
export const exampleArray = ['example'] as const;
export type ExampleArray = (typeof exampleArray)[number];

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
 * Represents a language from the available languages.
 */
export type Lang = z.infer<typeof appSchemas.availableLangs>;

/**
 * Represents the data structure for language data.
 */
export type LangData = z.infer<typeof appSchemas.langData>;

/**
 * Represents the structure for language files.
 */
export type LangFiles = z.infer<typeof appSchemas.langFiles>;

/**
 * Represents the data structure for body data.
 */
export type ReqResBody = z.infer<typeof appSchemas.reqResBody>;

/**
 * AppSettings is a type that represents an object where each key is a string and the value is a Tenant.
 */
export type AppSettings = z.infer<typeof appSchemas.appSettings>;

/**
 * StringMap is a type that represents an object with string keys and string values.
 */
export type StringMap = z.infer<typeof appSchemas.stringMap>;

/**
 * Tenant is a type that represents the structure of a tenant
 */

export type DefaultTenant = typeof defaultTenant;
export type AvailableTenants = z.infer<typeof appSchemas.availableTenants>;
export type AllowedTenants = z.infer<typeof appSchemas.allowedTenants>;
