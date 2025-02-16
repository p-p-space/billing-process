import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { readCookie } from '@/utils';
import { redisConnect } from '@/libs/redis';
import type { ApiPromise, Tenant } from '@/interfaces';
import { tenantCookieName } from '@/constans';
import { cognitoConnect, hashClienSecret } from '@/libs/cognito';
import { cognitoCredSetts, sessionSetts } from '@/tenants/tenantSettings';

export async function POST(request: NextRequest): ApiPromise {
  const { email, password } = await request.json();
  const { clientId } = await cognitoCredSetts();
  const { secretHash } = await hashClienSecret(email);
  const tenant = (await readCookie(tenantCookieName)) as Tenant;
  const { sessCookieName } = await sessionSetts(tenant);
  const sessId = (await readCookie(sessCookieName)) as Tenant;

  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  });

  const { status, cognitoResp, cognitoExec } = await cognitoConnect(command);

  const redisInstance = await redisConnect(sessId);

  if (cognitoExec?.ChallengeName) {
    const chnagePass = {
      session: cognitoExec.Session,
      userId: cognitoExec.ChallengeParameters?.USER_ID_FOR_SRP,
    };

    await redisInstance.hset(sessId, chnagePass);
  }

  if (cognitoExec?.AuthenticationResult) {
    const { AccessToken } = cognitoExec.AuthenticationResult;
    await redisInstance.hset(sessId, 'accessToken', `${AccessToken}`);
  }

  await redisInstance.quit();

  return NextResponse.json(cognitoResp, { status });
}
