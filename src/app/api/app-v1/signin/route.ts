import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal App
import { createResponseApi } from '@/libs/axios';
import type { ApiPromise } from '@/interfaces';
import { cognitoCredSetts } from '@/tenants/tenantSettings';
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoConnect, hashClienSecret } from '@/libs/cognito';

export async function POST(request: NextRequest): ApiPromise {
  const { email, password } = await request.json();
  const { clientId } = await cognitoCredSetts();
  const { secretHash } = await hashClienSecret(email);

  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  });

  const cognitoResp = await cognitoConnect(command);
  console.log({ cognitoResp });

  const resp = {
    code: '200.00.000',
    message: 'process ok',
  };

  const respHealth = createResponseApi(resp);
  return NextResponse.json(respHealth, { status: 200 });
}
