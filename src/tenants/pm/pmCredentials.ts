import { localCredentials } from './credentials/localCredentials';

const tenantconfig = {
  tenantId: localCredentials.tenantId,
  tenantClientId: localCredentials.tenantClientId,
  tenantClientSecret: localCredentials.tenantClientSecret,
  cognitoClientId: localCredentials.cognitoClientId,
  cognitoClientSecret: localCredentials.cognitoClientSecret,
};

export const credentials: Record<string, Record<string, string>> = {
  local: {
    ...tenantconfig,
  },
  dev: {
    ...tenantconfig,
  },
  test: {
    ...tenantconfig,
  },
  uat: {
    ...tenantconfig,
  },
  prod: {
    ...tenantconfig,
  },
};
