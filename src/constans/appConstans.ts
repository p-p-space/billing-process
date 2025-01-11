import { Tenant } from '@/interfaces';
import { tenantSettings } from './envConstans';

const apiString = 'api';

/**
 * Name of the application cookie.
 */
export const AppCookieName = 'app_tenant';

/**
 * Default tenant for the application.
 */
export const defaultTenant = tenantSettings.tenant as Tenant;

/**
 * List of available themes for the application.
 */
export const availableTenantsList = tenantSettings.availableTenantsList as Tenant[];

/**
 * List of allowed tenants for the application.
 */
export const allowedTenantsList = tenantSettings.allowedTenantsList as Tenant[];

/**
 * Toggles for enabling/disabling features.
 */
export const toggles = {
  handleRefresh: process.env.NEXT_PUBLIC_HANDLE_REFRESH ?? 'OFF',
};

/**
 * Base URLs for the application and services.
 */
export const baseURLs = {
  app: process.env.NEXT_PUBLIC_WEB_URL ?? '',
  serv: process.env.SERV_URL ?? '',
};

/**
 * API Versions.
 */
export const apiVersions = {
  apiServ: [`/${apiString}/v1.0.0`, `/${apiString}/v0`, `/${apiString}/v1.3`], // Versions for services API
  apiApp: 'app-v1', // Version for application API
  apiSearch: /^\/api\/v\d+(\.\d+)*\//, // Regular expression for API search
};

/**
 * API Paths constructed using template literals.
 */
export const apiPaths = {
  browserPath: `${apiVersions.apiServ[0]}`, // Path for browserPath API
  customerPath: `${apiVersions.apiServ[1]}`, // Path for customerPath API
  cardSolutionPath: `${apiVersions.apiServ[2]}`, // Path for card solution API
  appPath: `/${apiString}/${apiVersions.apiApp}`, // Path for application API
  appServApi: 'services', // Services API endpoint
  appApis: ['language', 'logout', 'prueba', 'signin'], // List of application API endpoints
};

/**
 * JWT and JWE Algorithms used for encryption and signing
 */
export const jwtAlgs = {
  jweAlgRsa: 'RSA-OAEP-256', // RSA algorithm for JWE
  jweAlgSec: 'A256KW', // Key wrapping algorithm for JWE
  jweEnc: 'A256GCM', // Encryption algorithm for JWE
  jwsAlgRsa: 'RS512', // RSA algorithm for JWS
  jwsAlgSec: 'HS512', // HMAC algorithm for JWS
  jwtAlg: 'PS512', // Algorithm for JWT
};

/**
 * JWT Configuration settings
 */
export const jwtConfig = {
  audience: 'audience', // Audience for the JWT
  issuer: 'issuer', // Issuer of the JWT
  expiresIn: '2h', // Expiration time for the JWT
};

/**
 * Header keys used in API requests
 */
export const headersKey = {
  contentType: 'content-type', // Header key for content type
  authorization: 'authorization', // Header key for content type
  appContentSecurity: 'app-content-security', // Header key for content security status
  appOriginPath: 'app-origin-path', // Header key for application origin path
  appJwsToken: 'app-token', // Header key for application JWS token
  appCookie: 'cookie', // Header key for app cookies
  servJwsToken: 'x-token', // Header key for service JWS token
  servTenantId: 'x-tenant-id', // Header key for service tenant ID
  servReqId: 'x-request-id', // Header key for service request ID
};
