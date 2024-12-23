import { cookies } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// Internal app imports
import type { CookieOptions, CookieValues } from '@/interfaces';

// Define constants for default values
const DEFAULT_PATH = '/';
const DEFAULT_SAMESITE = 'lax';
const DEFAULT_EXPIRATION = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000);

/**
 * Sets a cookie with the specified options.
 *
 * @param {CookieOptions} options - The options to configure the cookie.
 * @param {string} options.name - The name of the cookie.
 * @param {string} options.value - The value of the cookie.
 * @param {string} [options.path='/'] - The path where the cookie is valid. Defaults to '/'.
 * @param {boolean | 'lax' | 'strict' | 'none'} [options.sameSite='lax'] - The SameSite policy of the cookie. Defaults to 'lax'.
 * @param {Date | number} [options.expires] - The expiration date of the cookie. Defaults to 6 months from now.
 * @returns {CookieValues} cookieContent - The content of the cookie.
 */
export function cookieValues(options: CookieOptions): CookieValues {
  const { name, value, path = DEFAULT_PATH, sameSite = DEFAULT_SAMESITE, expires = DEFAULT_EXPIRATION } = options;

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
    expires,
  };

  return { cookieContent };
}

/**
 * Creates a cookie.
 *
 * @param {ResponseCookie} cookieContent - The cookie values.
 * @returns {Promise<void>}
 */
export async function createCookie(cookieContent: ResponseCookie): Promise<void> {
  const cookieStore = await cookies();

  try {
    cookieStore.set(cookieContent);
  } catch (error) {
    throw new Error(`Setting cookie: ${(error as Error).message}`); // Re-throw the error after logging it
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
    throw new Error(`Reading cookie: ${(error as Error).message}`); // Re-throw the error after logging it
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
    throw new Error(`Deleting cookie: ${(error as Error).message}`); // Re-throw the error after logging it
  }
}
