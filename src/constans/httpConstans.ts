// Environment variable for the web environment, defaults to 'local' if not set
export const webEnv = process.env.WEB_ENV ?? 'local';

// Base path for API endpoints
export const apiSrc = '/api';

/**
 * Prefix of the application cookies.
 */
export const prefixCookieName = 'billing_';

/**
 * Name of the application cookie.
 */
export const tenantCookieName = `${prefixCookieName}tenant`;

/**
 * Name of the session cookie.
 */
export const sessCookieName = `${prefixCookieName}info`;

/**
 * Name of the tenant cookie.
 */
export const langCookieName = `${prefixCookieName}lang`;

/**
 * Base URLs for the application and services.
 */
export const baseURLs = {
  app: process.env.WEB_URL,
  serv: process.env.SERV_URL,
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
  accountsApi: `${apiSrc}/v1.1`, // API version for accounts requests
};

/**
 * Header keys used in API requests
 */
export const headersKey = {
  contentType: 'content-type', // Header key for content type
  authorization: 'authorization', // Header key for content type
  appTenant: 'app-tenant', // Header key for tenant
  appContentSecurity: 'app-content-security', // Header key for content security status
  appOriginPath: 'app-origin-path', // Header key for application origin path
  appJwsToken: 'app-token', // Header key for application JWS token
  AppReqId: 'app-request-id', // Header key for application JWS token
  appCookie: 'cookie', // Header key for app cookies
  servJwsToken: 'x-token', // Header key for service JWS token
  servTenantId: 'x-tenant-id', // Header key for service tenant ID
  servReqId: 'x-request-id', // Header key for service request ID
};

/**
 * Cookie settings
 */
export const cookieSettings = {
  defaultPath: '/',
  defaultSameSite: 'lax' as const,
  defaultExpires: process.env.COOKIE_EXPIRES ?? new Date(Date.now() + 24 * 60 * 60 * 1000),
};

/**
 * Session settings
 */
export const sessSettings = {
  sessExpTime: process.env.SESS_EXP_TIME,
  sessMatchIp: process.env.SESS_MATCH_IP,
  sessRefresh: process.env.SESS_REFRESH,
};
