import { localCredentials } from './credentials/localCredentials';

const tenantConfig = {
  webUrl: localCredentials.webUrl,
  servUrl: localCredentials.servUrl,
  timeZone: localCredentials.timeZone,
  tenantId: localCredentials.tenantId,
  tenantClientId: localCredentials.tenantClientId,
  tenantClientSecret: localCredentials.tenantClientSecret,
  cognitoRegion: localCredentials.cognitoRegion,
  cognitoClientId: localCredentials.cognitoClientId,
  cognitoClientSecret: localCredentials.cognitoClientSecret,
  secJweStr: localCredentials.secJweStr,
  secJwsStr: localCredentials.secJwsStr,
  webJwePrivKey: localCredentials.webJwePrivKey,
  webJwePubKey: localCredentials.webJwePubKey,
  webJwsPrivKey: localCredentials.webJwsPrivKey,
  webJwsPubKey: localCredentials.webJwsPubKey,
  servJwePrivKey: localCredentials.servJwePrivKey,
  servJwePubKey: localCredentials.servJwePubKey,
  servJwsPrivKey: localCredentials.servJwsPrivKey,
  servJwsPubKey: localCredentials.servJwsPubKey,
};

export const credentials: Record<string, Record<string, string>> = {
  local: {
    ...tenantConfig,
  },
  dev: {
    ...tenantConfig,
  },
  test: {
    ...tenantConfig,
  },
  uat: {
    ...tenantConfig,
  },
  prod: {
    ...tenantConfig,
  },
};
