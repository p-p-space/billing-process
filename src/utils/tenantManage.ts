import { AllowedTenants } from '@/interfaces';
import { defaultTenant, appSettings } from '@/constans';

/**
 * Checks if the tenant value is an available tenant.
 * @param {string | undefined} value - The url tenant.
 * @returns {Allowedtenants} The available tenant or the default tenant.
 */
export function availableTenant(value: string | undefined): AllowedTenants {
  const { allowedTenants } = appSettings;
  const tenantUrl = value && allowedTenants.includes(value as AllowedTenants) ? value : defaultTenant;

  return tenantUrl as AllowedTenants;
}
