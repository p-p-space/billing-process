import { Tenant } from '@/interfaces';

const tenant: Tenant = 'bt';
const apiString = 'api';

export const AppCookieName = 'app_tenant';

export const defaultTenant: Tenant = (process.env.TENANT_DEFAULT as Tenant) ?? tenant;

export const availableThemes: Tenant[] = (process.env.AVAILABLE_THEMES?.split(',').map((tenant) =>
  tenant.trim()
) as Tenant[]) ?? [tenant];

export const allowedTenants: Tenant[] = (process.env.ALLOED_TENANTS?.split(',').map((tenant) =>
  tenant.trim()
) as Tenant[]) ?? [tenant];

// Base URLs for the application and services
export const baseURLs = {
  app: process.env.NEXT_PUBLIC_WEB_URL ?? '',
  serv: process.env.SERV_URL ?? '',
};

// API Versions
export const apiVersions = {
  apiServ: [`/${apiString}/v1.0.0`, `/${apiString}/v0`, `/${apiString}/v1.3`], // Version for services API
  apiApp: 'app-v1', // Version for application API,
  apiSearch: /^\/api\/v\d+(\.\d+)*\//, // Regular expression for API search
};

// API Paths constructed using template literals
export const apiPaths = {
  browserPath: `${apiVersions.apiServ[0]}`, // Path for browserPath API
  customerPath: `${apiVersions.apiServ[1]}`, // Path for customerPath API
  cardSolutionPath: `${apiVersions.apiServ[2]}`, // Path for card solution API
  appPath: `/${apiString}/${apiVersions.apiApp}`, // Path for application API
  appServApi: 'services', // Services API endpoint
  appApis: ['language', 'logout', 'prueba'], // List of application API endpoints
};

// JWT and JWE Algorithms used for encryption and signing
export const jwtAlgs = {
  jweAlgRsa: 'RSA-OAEP-256', // RSA algorithm for JWE
  jweAlgSec: 'A256KW', // Key wrapping algorithm for JWE
  jweEnc: 'A256GCM', // Encryption algorithm for JWE
  jwsAlgRsa: 'RS512', // RSA algorithm for JWS
  jwsAlgSec: 'HS512', // HMAC algorithm for JWS
  jwtAlg: 'PS512', // Algorithm for JWT
};

// JWT Configuration settings
export const jwtConfig = {
  audience: 'audience', // Audience for the JWT
  issuer: 'issuer', // Issuer of the JWT
  expiresIn: '2h', // Expiration time for the JWT
};
