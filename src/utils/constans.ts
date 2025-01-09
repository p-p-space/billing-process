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
