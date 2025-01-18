export const defaultTenant = 'bt';
export const defaultLang = 'en';
const availableTenants = [defaultTenant, 'pm'] as const;
const allowedTenants = [...availableTenants, 'pp'] as const;
const availableLangs = ['en', 'es'] as const;

export const appSettings = {
  availableTenants,
  allowedTenants,
  availableLangs,
};

// Web Keys and Secrets (Publicly Exposed)
export const webKeys = {
  secJweStr: process.env.NEXT_PUBLIC_SECRET_JWE_STR ?? '',
  secJwsStr: process.env.NEXT_PUBLIC_SECRET_JWS_STR ?? '',
  webJwePubKey: process.env.NEXT_PUBLIC_WEB_JWE_PUBLIC_KEY ?? '',
  webJwsPubKey: process.env.NEXT_PUBLIC_WEB_JWS_PUBLIC_KEY ?? '',
} as const;

// Servevices Keys and Secrets (Not Publicly Exposed)
export const servKeys = {
  webJwePrivKey: process.env.WEB_JWE_PRIVATE_KEY ?? '',
  webJwsPrivKey: process.env.WEB_JWS_PRIVATE_KEY ?? '',
  servJwePrivKey: process.env.SERV_JWE_PRIVATE_KEY ?? '',
  servJwePubKey: process.env.SERV_JWE_PUBLIC_KEY ?? '',
  servJwsPrivKey: process.env.SERV_JWS_PRIVATE_KEY ?? '',
  servJwsPubKey: process.env.SERV_JWS_PUBLIC_KEY ?? '',
} as const;
