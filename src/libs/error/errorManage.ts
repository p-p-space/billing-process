import type { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { codeMessages } from '@/constans';
import { ErrorClientResp } from '@/interfaces';

export class HandleError extends Error {
  code: string;
  payload: unknown;

  constructor({ data }: ErrorClientResp, name: string = 'Globalexception') {
    const { code, message, payload } = data;
    super(message);
    this.name = name;
    this.code = code;
    this.payload = payload;
  }
}

export function messageUser(code: string): string {
  const message = codeMessages[code as keyof typeof codeMessages] || codeMessages.default;

  return message;
}

export function handleCognitoError(cognitoError: CognitoIdentityProviderServiceException, statusCode: number) {
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
    case 'Code mismatch': //{t('messages.otpInvalid)}
      errorCode = `${statusCode}.99.014`;
      break;
    case 'Invalid code received for user': //{t('messages.otpInvalid)}
      errorCode = `${statusCode}.99.015`;
      break;
    case 'Your software token has already been used once': //{t('messages.otpInvalid)}
      errorCode = `${statusCode}.99.016`;
      break;
    case 'User does not exist': // {t('messages.incorrectCredentials)}
      errorCode = `${statusCode}.99.017`;
      break;
  }

  return errorCode;
}
