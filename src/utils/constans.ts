// Base URLs
export const baseAppURL = process.env.NEXT_PUBLIC_WEB_URL ?? '';
export const baseServURL = process.env.SERV_URL ?? '';

// Feature Toggles
export const handleRefresh = process.env.NEXT_PUBLIC_HANDLE_REFRESH ?? 'OFF';

// Tenant and Credentials
export const tenantId = process.env.TENANT_ID ?? '';
export const credentialsKey = process.env.CREDENTIALS_KEY ?? '';
export const credentialsSecret = process.env.CREDENTIALS_SECRET ?? '';

// JWT and JWE Algorithms
export const rsaAlgJwe = 'RSA-OAEP-256';
export const JweAlgSec = 'A256KW';
export const JweEnc = 'A256GCM';
export const jwsAlgRsa = 'RS512';
export const secretAlgJws = 'HS512';
export const JwtAlg = 'PS512';

// JWT Configuration
export const audience = 'audience';
export const issuer = 'issuer';
export const expiresIn = '2h';

// Web Keys and Secrets (Publicly Exposed)
export const webJweSecretString = process.env.NEXT_PUBLIC_SECRET_jWE ?? '';
export const webJwsSecretString = process.env.NEXT_PUBLIC_SECRET_jWS ?? '';
export const webJwePublicKey = process.env.NEXT_PUBLIC_WEB_JWE_PUBLIC_KEY ?? '';
export const webJwsPublicKey = process.env.NEXT_PUBLIC_WEB_JWS_PUBLIC_KEY ?? '';

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
