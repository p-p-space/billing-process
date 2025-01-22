import { credentials } from './ptCredentials';
import type { AppSettings } from '@/interfaces';
import { defaultTenant, webEnv } from '@/constans';

export const defaultSettings: AppSettings = {
  tenant: defaultTenant,
  tenantTheme: defaultTenant,
  tenantImages: defaultTenant,
  tenantDictionary: defaultTenant,
  tenantId: credentials[webEnv].tenantId,
  tenantClientId: credentials[webEnv].tenantClientId,
  tenantClientSecret: credentials[webEnv].tenantClientSecret,
  cognitoRegion: credentials[webEnv].cognitoRegion,
  cognitoClientId: credentials[webEnv].cognitoClientId,
  cognitoClientSecret: credentials[webEnv].cognitoClientSecret,
  secJweStr: credentials[webEnv].secJweStr,
  secJwsStr: credentials[webEnv].secJwsStr,
  webJwePrivKey: credentials[webEnv].webJwePrivKey,
  webJwePubKey: credentials[webEnv].webJwePubKey,
  webJwsPrivKey: credentials[webEnv].webJwsPrivKey,
  webJwsPubKey: credentials[webEnv].webJwsPubKey,
  servJwePrivKey: credentials[webEnv].servJwePrivKey,
  servJwePubKey: credentials[webEnv].servJwePubKey,
  servJwsPrivKey: credentials[webEnv].servJwsPrivKey,
  servJwsPubKey: credentials[webEnv].servJwsPubKey,
};
