import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// Internal app
import { langs } from '@/i18n';

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
