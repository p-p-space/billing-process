import { localCredentials } from './credentials/localCredentials';

export const credentials: Record<string, Record<string, string>> = {
  local: {
    tenantId: localCredentials.tenantId,
    tenantClientId: localCredentials.tenantClientId,
    tenantClientSecret: localCredentials.tenantClientSecret,
    cognitoClientId: localCredentials.cognitoClientId,
    cognitoClientSecret: localCredentials.cognitoClientSecret,
  },
  dev: {
    tenantId: localCredentials.tenantId,
    tenantClientId: localCredentials.tenantClientId,
    tenantClientSecret: localCredentials.tenantClientSecret,
    cognitoClientId: localCredentials.cognitoClientId,
    cognitoClientSecret: localCredentials.cognitoClientSecret,
  },
  test: {
    tenantId: localCredentials.tenantId,
    tenantClientId: localCredentials.tenantClientId,
    tenantClientSecret: localCredentials.tenantClientSecret,
    cognitoClientId: localCredentials.cognitoClientId,
    cognitoClientSecret: localCredentials.cognitoClientSecret,
  },
  uat: {
    tenantId: localCredentials.tenantId,
    tenantClientId: localCredentials.tenantClientId,
    tenantClientSecret: localCredentials.tenantClientSecret,
    cognitoClientId: localCredentials.cognitoClientId,
    cognitoClientSecret: localCredentials.cognitoClientSecret,
  },
  prod: {
    tenantId: localCredentials.tenantId,
    tenantClientId: localCredentials.tenantClientId,
    tenantClientSecret: localCredentials.tenantClientSecret,
    cognitoClientId: localCredentials.cognitoClientId,
    cognitoClientSecret: localCredentials.cognitoClientSecret,
  },
};
