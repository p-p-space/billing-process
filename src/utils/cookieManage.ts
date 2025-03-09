import { cookies } from 'next/headers';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// Internal app imports
import { cookieSettings } from '@/constans';
import type { CookieOptions } from '@/interfaces';

/**
 * Sets a cookie with the specified options.
 *
 * @param {CookieOptions} options - The options to configure the cookie.
 * @param {string} options.name - The name of the cookie.
 * @param {string} options.value - The value of the cookie.
 * @param {string} [options.path='/'] - The path where the cookie is valid. Defaults to '/'.
 * @param {boolean | 'lax' | 'strict' | 'none'} [options.sameSite='lax'] - The SameSite policy of the cookie. Defaults to 'lax'.
 * @param {Date | number} [options.expires] - The expiration date of the cookie. Defaults to 6 months from now.
 * @returns {ResponseCookie} cookieContent - The content of the cookie.
 */
export function cookieValues(options: CookieOptions): ResponseCookie {
  const { defaultPath, defaultSameSite, defaultExpires } = cookieSettings;
  const { name, value, path = defaultPath, sameSite = defaultSameSite, expires = defaultExpires } = options;

  if (!name || !value) {
    throw new Error('Cookie name and value are required');
  }

  const cookieContent: ResponseCookie = {
    name,
    value,
    path,
    sameSite,
    secure: true,
    httpOnly: true,
  };

  if (expires instanceof Date) {
    cookieContent.expires = expires;
  } else {
    const maxAge = typeof expires === 'number' ? expires : parseInt(expires);
    cookieContent.maxAge = maxAge;
  }

  return cookieContent;
}

/**
 * Creates a cookie.
 *
 * @param {ResponseCookie} cookieContent - The cookie values.
 * @returns {Promise<void>}
 */
export async function setCookie(cookieContent: ResponseCookie): Promise<void> {
  const cookieStore = await cookies();

  try {
    cookieStore.set(cookieContent);
  } catch (error) {
    throw new Error(`Setting cookie: ${(error as Error).message}`);
  }
}

/**
 * Reads the value of a specified cookie.
 * @param {string} cookieName - The name of the cookie to read.
 * @returns {Promise<string | undefined>} The value of the cookie, or undefined if not found.
 */
export async function readCookie(cookieName: string): Promise<string | undefined> {
  const cookieStore = await cookies();

  if (!cookieName) {
    throw new Error('Cookie name is required');
  }

  try {
    const cookieValue = cookieStore.get(cookieName)?.value;

    return cookieValue;
  } catch (error) {
    throw new Error(`Reading cookie: ${(error as Error).message}`);
  }
}

/**
 * Deletes a specified cookie.
 * @param {string} cookieName - The name of the cookie to delete.
 * @returns {Promise<void>}
 */
export async function deleteCookie(cookieName: string): Promise<void> {
  const cookieStore = await cookies();

  if (!cookieName) {
    throw new Error('Cookie name is required');
  }

  try {
    cookieStore.delete(cookieName);
  } catch (error) {
    throw new Error(`Deleting cookie: ${(error as Error).message}`);
  }
}
