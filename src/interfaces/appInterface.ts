import { z } from 'zod';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// Internal App
import { appSchema } from '@/schemas';

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
export type Lang = z.infer<typeof appSchema.lang>;

/**
 * Represents the data structure for language data.
 */
export type LangData = z.infer<typeof appSchema.langData>;

/**
 * Represents the structure for language files.
 */
export type LangFiles = z.infer<typeof appSchema.langFiles>;

/**
 * Represents the data structure for body data.
 */
export type ReqResBody = z.infer<typeof appSchema.reqResBody>;

/**
 * SettingsApp is a type that represents an object where each key is a string and the value is a Tenant.
 */
export type SettingsApp = z.infer<typeof appSchema.settingsApp>;

/**
 * StringMap is a type that represents an object with string keys and string values.
 */
export type StringMap = z.infer<typeof appSchema.stringMap>;

/**
 * Tenant is a type that represents the structure of a tenant schema.
 */
export type Tenant = z.infer<typeof appSchema.tenant>;
