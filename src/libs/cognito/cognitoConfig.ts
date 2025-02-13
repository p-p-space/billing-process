'use server';

import crypto from 'crypto';
import * as aws from '@aws-sdk/client-cognito-identity-provider';
import { cognitoCredSetts } from '@/tenants/tenantSettings';
// Internal App

/**
 * Creates a new instance of CognitoIdentityProviderClient with the provided credentials.
 *
 * @returns {aws.CognitoIdentityProviderClient} A new instance of CognitoIdentityProviderClient.
 */
export async function createCognitoClient(): Promise<aws.CognitoIdentityProviderClient> {
  const { region } = await cognitoCredSetts();

  const cognitoClient = new aws.CognitoIdentityProviderClient({
    region,
  });

  return cognitoClient;
}

export async function hashClienSecret(user: string) {
  const { clientId, clientSecret } = await cognitoCredSetts();

  const secretHash = crypto
    .createHmac('sha256', clientSecret)
    .update(user + clientId)
    .digest('base64');

  return { secretHash };
}

export async function cognitoConnect(command: aws.InitiateAuthCommand) {
  console.log(command.input);
  const cognitoClient = await createCognitoClient();

  try {
    const result = await cognitoClient.send(command);
    console.log({ result });
    return result;
  } catch (error) {
    const parseError = error as aws.CognitoIdentityProviderServiceException;
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
