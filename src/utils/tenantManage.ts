import { headers } from 'next/headers';
// Internal app
import type { Tenant } from '@/interfaces';
import { readCookie } from './cookieManage';
import { availableTenants, defaultTenant, tenantPrefix } from '@/constans';
import { headersKey, sessCookieName, tenantCookieName } from '@/constans/httpConstans';

/**
 * Checks if the tenant value is an available tenant.
 * @param {string | undefined} value - The url tenant.
 * @returns {Tenant} The available tenant or the default tenant.
 */
export function availableTenant(value: string): Tenant {
  const tenantUri = value ? value.replace(tenantPrefix, '') : value;
  const tenant = availableTenants.includes(tenantUri as Tenant) ? tenantUri : defaultTenant;

  return tenant as Tenant;
}

/**
 * Reads the value of the tenant cookie.
 * @returns {Promise<Tenant>}
 */
export async function currenTenant(): Promise<Tenant> {
  const headerStore = await headers();
  const tenant = (await readCookie(tenantCookieName)) ?? headerStore.get(headersKey.appTenant);

  return tenant as Tenant;
}

/**
 * Reads the value of the tenant cookie.
 * @returns {Promise<string>}
 */
export async function sisseionId(): Promise<string> {
  const tenant = (await readCookie(sessCookieName)) as string;

  return tenant;
}
