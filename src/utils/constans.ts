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
  jweSecString: process.env.NEXT_PUBLIC_SECRET_JWE ?? '',
  jwsSecString: process.env.NEXT_PUBLIC_SECRET_JWS ?? '',
  jwePublicKey: process.env.NEXT_PUBLIC_WEB_JWE_PUBLIC_KEY ?? '',
  jwsPublicKey: process.env.NEXT_PUBLIC_WEB_JWS_PUBLIC_KEY ?? '',
};

// Server Keys and Secrets (Not Publicly Exposed)
export const webJwePrivateKey = process.env.WEB_JWE_PRIVATE_KEY ?? '';
export const webJwsPrivateKey = process.env.WEB_JWS_PRIVATE_KEY ?? '';
export const servJwePrivateKey = process.env.SERV_JWE_PRIVATE_KEY ?? '';
export const servJwePublicKey = process.env.SERV_JWE_PUBLIC_KEY ?? '';
export const servJwsPrivateKey = process.env.SERV_JWS_PRIVATE_KEY ?? '';
export const servJwsPublicKey = process.env.SERV_JWS_PUBLIC_KEY ?? '';

// Application Specific Constants
export const appBodyContent = 'app-body-content';
export const appOriginPath = 'app-origin-path';
export const jwsToken = 'app-token';
export const servicesApi = 'services';
export const appApis = ['language', 'logout', 'prueba'];

// API Versions and Paths
export const apiVersionServ = 'v0';
export const apiVersionApp = 'app-v1';
export const pathServ = `/api/${apiVersionServ}`;
export const pathApp = `/api/${apiVersionApp}`;

// Server Keys and Secrets (Not Publicly Exposed)
export const servKeys = {
  jwePrivateKey: process.env.WEB_JWE_PRIVATE_KEY ?? '',
  jwsPrivateKey: process.env.WEB_JWS_PRIVATE_KEY ?? '',
  servJwePrivateKey: process.env.SERV_JWE_PRIVATE_KEY ?? '',
  servJwePublicKey: process.env.SERV_JWE_PUBLIC_KEY ?? '',
  servJwsPrivateKey: process.env.SERV_JWS_PRIVATE_KEY ?? '',
  servJwsPublicKey: process.env.SERV_JWS_PUBLIC_KEY ?? '',
};

// Header keys used in API requests
export const headersKey = {
  appBodyContent: 'app-body-content', // Header key for application body content
  appOriginPath: 'app-origin-path', // Header key for application origin path
  appJwsToken: 'app-token', // Header key for application JWS token
  servJwsToken: 'x-token', // Header key for service JWS token
  servTenantId: 'x-tenant-id', // Header key for service tenant ID
  servReqId: 'x-request-id', // Header key for service request ID
};

// API Versions
export const apiVersions = {
  serv: 'v0', // Version for service API
  app: 'app-v1', // Version for application API
};

// API Paths constructed using template literals
export const apiPaths = {
  pathServ: `/api/${apiVersions.serv}`, // Path for service API
  pathApp: `/api/${apiVersions.app}`, // Path for application API
  servicesApi: 'services', // Services API endpoint
  appApis: ['language', 'logout', 'prueba'], // List of application API endpoints
};
