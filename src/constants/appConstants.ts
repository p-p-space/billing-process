import { Tenant } from '@/interfaces';

const tenant: Tenant = 'bt';

export const AppCookieName = 'app_tenant';

export const defaultTenant: Tenant = (process.env.TENANT_DEFAULT as Tenant) ?? tenant;

export const availableThemes: Tenant[] = (process.env.AVAILABLE_THEMES?.split(',').map((tenant) =>
  tenant.trim()
) as Tenant[]) ?? [tenant];

export const allowedTenants: Tenant[] = (process.env.ALLOED_TENANTS?.split(',').map((tenant) =>
  tenant.trim()
) as Tenant[]) ?? [tenant];

// API Versions
export const apiVersions = {
  serv: 'v0', // Version for service API
  app: 'app-v1', // Version for application API
};

// API Paths constructed using template literals
export const apiPaths = {
  servPath: `/api/${apiVersions.serv}`, // Path for service API
  appPath: `/api/${apiVersions.app}`, // Path for application API
  servApi: 'services', // Services API endpoint
  appApis: ['language', 'logout', 'prueba'], // List of application API endpoints
};
