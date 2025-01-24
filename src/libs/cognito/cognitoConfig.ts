'use server';

import crypto from 'crypto';
import {
  CognitoIdentityProviderClient,
  CognitoIdentityProviderServiceException,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
// Internal App
import { selectSettings } from '@/tenants/tenantOptions';

/**
 * Creates a new instance of CognitoIdentityProviderClient with the provided credentials.
 *
 * @returns {CognitoIdentityProviderClient} A new instance of CognitoIdentityProviderClient.
 */
export async function createCognitoClient(): Promise<CognitoIdentityProviderClient> {
  const { region } = await cognitoCreedentials();

  const cognitoClient = new CognitoIdentityProviderClient({
    region,
  });

  return cognitoClient;
}

export async function hashClienSecret(user: string) {
  const { clientId, clientSecret } = await cognitoCreedentials();

  const secretHash = crypto
    .createHmac('sha256', clientSecret)
    .update(user + clientId)
    .digest('base64');

  return { secretHash };
}

export async function cognitoCreedentials() {
  const credentials = await selectSettings();

  return {
    clientId: credentials.cognitoClientId,
    clientSecret: credentials.cognitoClientSecret,
    region: credentials.cognitoRegion,
  };
}

export async function cognitoConnect(command: InitiateAuthCommand) {
  console.log(command.input);
  const cognitoClient = await createCognitoClient();

  try {
    const result = await cognitoClient.send(command);
    console.log({ result });
    return result;
  } catch (error) {
    const parseError = error as CognitoIdentityProviderServiceException;
    // Handle code status
    // const status = parseError.$metadata.httpStatusCode;
    console.error({ parseError });
    console.error(parseError.name);
    console.error(parseError.message);
    console.error(parseError.$fault);
    console.error(parseError.$metadata);

    return parseError;
  }
}
