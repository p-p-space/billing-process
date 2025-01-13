import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { ApiResponsePromise } from '@/interfaces';
import { createErrorResponseApi, createResponseApi } from '@/libs';
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoCreedentials, createCognitoClient, hashClienSecret } from '@/libs/cognitoConfig';

export async function POST(request: NextRequest): ApiResponsePromise {
  // const { userName, password } =
  await request.json();
  const userName = 'hcorredor';
  const password = 'Gato.1992';
  const { clientId } = await cognitoCreedentials();
  const { secretHash } = await hashClienSecret(userName);
  const cognitoClient = await createCognitoClient();

  try {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: clientId,
      AuthParameters: {
        USERNAME: userName,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    });

    const result = await cognitoClient.send(command);
    console.log({ result });

    const response = {
      code: '200.00.000',
      message: 'process ok',
    };

    const respHealth = createResponseApi(response);
    return NextResponse.json(respHealth, { status: 200 });
  } catch (error) {
    console.log({ error });
    const { status, data } = createErrorResponseApi(error as Error);
    console.log({ status, data });
    return NextResponse.json(data, { status });
  }
}
