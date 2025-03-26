import crypto from 'crypto';
import { decodeJwt } from 'jose';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import type { $Command, CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { apiRespObject } from '@/constans';
import { handleCognitoError } from '../error';
import { CognitoAuthResult } from '@/interfaces';
import { cognitoCredSetts } from '@/tenants/tenantSettings';

/**
 * Creates a new instance of CognitoIdentityProviderClient with the provided credentials.
 *
 * @returns {CognitoIdentityProviderClient} A new instance of CognitoIdentityProviderClient.
 */
export async function createCognitoClient(): Promise<CognitoIdentityProviderClient> {
  const { region } = await cognitoCredSetts();

  const cognitoClient = new CognitoIdentityProviderClient({
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

export async function cognitoConnect(command: $Command<any, any, any>) {
  const cognitoResp = { ...apiRespObject };

  try {
    const cognitoClient = await createCognitoClient();
    const result = await cognitoClient.send(command);
    const status = result.$metadata.httpStatusCode ?? 200;
    return { status, result, cognitoResp };
  } catch (error) {
    const cognitoError = error as CognitoIdentityProviderServiceException;
    const status = cognitoError.$metadata.httpStatusCode ?? 400;
    cognitoResp.code = handleCognitoError(cognitoError, status);
    cognitoResp.message = `${cognitoError.name}: ${cognitoError.message}`;
    return { status, cognitoResp };
  }
}

export function decodeAuthResult(result: CognitoAuthResult) {
  const { AccessToken: accessToken, IdToken: idToken, RefreshToken: refreshToken } = result;
  const cognitoToken = decodeJwt(accessToken);
  const cognitoIdToken = decodeJwt(idToken);
  const expireToken = cognitoToken.exp ?? 0;
  const cognitoExp = new Date(expireToken * 1000).getTime();
  const cognitoUserId = cognitoToken.username;
  const email = cognitoIdToken.email;

  return {
    accessToken,
    idToken,
    refreshToken,
    cognitoUserId,
    cognitoExp,
    userAttr: JSON.stringify({ email }),
  };
}
