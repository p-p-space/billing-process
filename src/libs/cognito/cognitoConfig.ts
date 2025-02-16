import crypto from 'crypto';
import type * as AWS from '@aws-sdk/client-cognito-identity-provider';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { cognitoCredSetts } from '@/tenants/tenantSettings';
import { apiRespObject } from '@/constans';

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

export async function cognitoConnect(command: AWS.InitiateAuthCommand) {
  const cognitoResp = { ...apiRespObject };
  console.log(command.input);

  try {
    const cognitoClient = await createCognitoClient();
    const cognitoExec = await cognitoClient.send(command);
    const status = cognitoExec.$metadata.httpStatusCode ?? 200;

    console.log(status, cognitoResp, cognitoExec);
    return { status, cognitoResp, cognitoExec };
  } catch (error) {
    const cognitoError = error as AWS.CognitoIdentityProviderServiceException;
    const status = cognitoError.$metadata.httpStatusCode ?? 400;
    cognitoResp.code = manageErrorCognito(cognitoError, status);
    cognitoResp.message = `${cognitoError.name}: ${cognitoError.message}`;
    console.error(status, cognitoResp);
    return { status, cognitoResp };
  }
}

function manageErrorCognito(cognitoError: AWS.CognitoIdentityProviderServiceException, statusCode: number) {
  let errorCode = `${statusCode}.99.000`;

  switch (cognitoError.message.replace('.', '')) {
    case 'Incorrect username or password': // {t('messages.incorrectCredentials)}
      errorCode = `${statusCode}.99.001`;
      break;
    case 'Password attempts exceeded': //{t('messages.passwordAttemptsExceeded)}
      errorCode = `${statusCode}.99.002`;
      break;
    case 'Invalid Refresh Token': //{t('messages.invalidRefreshToken)}
      errorCode = `${statusCode}.99.003`;
      break;
    case 'Invalid session for the user, session is expired': //{t('messages.sessionExpired)}
      errorCode = `${statusCode}.99.004`;
      break;
    case 'A client attempted to write unauthorized attribute': //{t('messages.unauthorizedAttribute)}
      errorCode = `${statusCode}.99.005`;
      break;
    case 'Access Token has been revoked': //{t('messages.accessTokenRevoked)}
      errorCode = `${statusCode}.99.006`;
      break;
    case `SecretHash does not match for the client: ${/^[a-z0-9]{26}$/} `: //{t('messages.secretHashNotMatch)}
      errorCode = `${statusCode}.99.007`;
      break;
    case 'Could not load credentials from any providers': //{t('messages.couldNotLoadCredentials)}
      errorCode = `${statusCode}.99.008`;
      break;
    case 'Attempt limit exceeded, please try after some time': //{t('messages.otpLimitAxceed)}
      errorCode = `${statusCode}.99.009`;
      break;
    case 'Password has previously been used': //{t('messages.passwordUsed)}
      errorCode = `${statusCode}.99.010`;
      break;
    case 'Temporary password has expired and must be reset by an administrator': //{t('messages.tempPasswordExpired)}
      errorCode = `${statusCode}.99.011`;
      break;
    case 'Invalid verification code provided, please try again': //{t('messages.otpInvalid)}
      errorCode = `${statusCode}.99.012`;
      break;
    case 'Invalid code provided, please request a code again': //{t('messages.otpExpired)}
      errorCode = `${statusCode}.99.013`;
      break;
  }

  return errorCode;
}
