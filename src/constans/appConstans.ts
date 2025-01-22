// Environment variable for the web environment, defaults to 'local' if not set
export const webEnv = process.env.NEXT_PUBLIC_WEB_ENV ?? 'local';

// Base path for API endpoints
export const apiSrc = '/api';

/**
 * Name of the application cookie.
 */
export const tenantCookieName = 'app_tenant';

/**
 * Name of the tenant cookie.
 */
export const langCookieName = 'app_lang';

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
  app: process.env.NEXT_PUBLIC_WEB_URL ?? 'http://localhost:3000',
  serv: process.env.SERV_URL ?? 'https://t-api.novopayment.com',
};

/**
 * API Paths constructed using template literals.
 */
export const apiPaths = {
  apiSearch: /^\/api\/v\d+(\.\d+)*\//, // Regular expression for API search
  appAPiV1: `${apiSrc}/app-v1`, // Application API path for internal requests
  appApiServ: '/services', // Services API endpoint
  appBrowserApi: `${apiSrc}/v1.0.0`, // API version for browser to application requests
  customersApi: `${apiSrc}/v0`, // API version for customer requests
  cardsSolApi: `${apiSrc}/v1.3`, // API version for cards solution requests
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
  AppReqId: 'app-request-id', // Header key for application JWS token
  appCookie: 'cookie', // Header key for app cookies
  servJwsToken: 'x-token', // Header key for service JWS token
  servTenantId: 'x-tenant-id', // Header key for service tenant ID
  servReqId: 'x-request-id', // Header key for service request ID
};
