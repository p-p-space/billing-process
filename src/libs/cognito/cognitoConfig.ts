'use server';
import crypto from 'crypto';
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal App
import { readCookie } from '@/utils';
import { Tenant } from '@/interfaces';
import { appCookieName } from '@/constans';
import { selectSettings } from '@/tenants/tenantOptions';

/**
 * Creates a new instance of CognitoIdentityProviderClient with the provided credentials.
 *
 * @returns {CognitoIdentityProviderClient} A new instance of CognitoIdentityProviderClient.
 */
export async function createCognitoClient(): Promise<CognitoIdentityProviderClient> {
  const { region } = await cognitoCreedentials();

  const cognitoClient = new CognitoIdentityProviderClient({
    region: region,
  });

  return cognitoClient;
}

export async function hashClienSecret(userName: string) {
  const { clientId, clientSecret } = await cognitoCreedentials();

  const secretHash = crypto
    .createHmac('sha256', clientSecret)
    .update(userName + clientId)
    .digest('base64');

  return { secretHash };
}

export async function cognitoCreedentials() {
  const tenant = (await readCookie(appCookieName)) as Tenant;

  const credentials = await selectSettings(tenant);
  const { tenantCognitoClientId, tenantCognitoClientSecret, tenantCognitoRegion } = credentials;

  return {
    clientId: tenantCognitoClientId,
    clientSecret: tenantCognitoClientSecret,
    region: tenantCognitoRegion,
  };
}

export async function cognitoConnect(command: InitiateAuthCommand) {
  console.log({ command });

  const cognitoClient = await createCognitoClient();

  const result = await cognitoClient.send(command);
  console.log({ result });

  return result;
}
