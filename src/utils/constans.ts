// Base URLs for the application and services
export const baseURLs = {
  app: process.env.NEXT_PUBLIC_WEB_URL ?? '',
  serv: process.env.SERV_URL ?? '',
};

// Toggles for enabling/disabling features
export const toggles = {
  handleRefresh: process.env.NEXT_PUBLIC_HANDLE_REFRESH ?? 'OFF',
};

// Tenant and Credentials for authentication
export const creds = {
  tenantId: process.env.TENANT_ID ?? '',
  key: process.env.CREDENTIALS_KEY ?? '',
  secret: process.env.CREDENTIALS_SECRET ?? '',
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

// Web Keys and Secrets (Publicly Exposed)
export const webKeys = {
  secJweStr: process.env.NEXT_PUBLIC_SECRET_JWE_STR ?? '',
  secJwsStr: process.env.NEXT_PUBLIC_SECRET_JWS_STR ?? '',
  webJwePubKey: process.env.NEXT_PUBLIC_WEB_JWE_PUBLIC_KEY ?? '',
  webJwsPubKey: process.env.NEXT_PUBLIC_WEB_JWS_PUBLIC_KEY ?? '',
};

// Servevices Keys and Secrets (Not Publicly Exposed)
export const servKeys = {
  webJwePrivKey: process.env.WEB_JWE_PRIVATE_KEY ?? '',
  webJwsPrivKey: process.env.WEB_JWS_PRIVATE_KEY ?? '',
  servJwePrivKey: process.env.SERV_JWE_PRIVATE_KEY ?? '',
  servJwePubKey: process.env.SERV_JWE_PUBLIC_KEY ?? '',
  servJwsPrivKey: process.env.SERV_JWS_PRIVATE_KEY ?? '',
  servJwsPubKey: process.env.SERV_JWS_PUBLIC_KEY ?? '',
};

// Header keys used in API requests
export const headersKey = {
  contentType: 'Content-Type', // Header key for content type
  authorization: 'Authorization', // Header key for content type
  appContentSecurity: 'App-Content-Security', // Header key for content security status
  appOriginPath: 'App-Origin-Path', // Header key for application origin path
  appJwsToken: 'App-Token', // Header key for application JWS token
  servJwsToken: 'X-Token', // Header key for service JWS token
  servTenantId: 'X-tenant-Id', // Header key for service tenant ID
  servReqId: 'X-Request-Id', // Header key for service request ID
};

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
