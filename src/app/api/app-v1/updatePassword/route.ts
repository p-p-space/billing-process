import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RespondToAuthChallengeCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import type { ApiPromise } from '@/interfaces';
import { cognitoCredSetts } from '@/tenants/tenantSettings';
import { deleteSessAttr, getSessAttr, setSession } from '@/libs/redis';
import { cognitoConnect, decodeAuthResult, hashClienSecret } from '@/libs/cognito';

export async function POST(request: NextRequest): ApiPromise {
  const { newPassword } = await request.json();
  const { clientId } = await cognitoCredSetts();
  const userId = (await getSessAttr('userId')) as string;
  const session = (await getSessAttr('session')) as string;
  const { secretHash } = await hashClienSecret(userId);

  const command = new RespondToAuthChallengeCommand({
    ClientId: clientId,
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ChallengeResponses: {
      NEW_PASSWORD: newPassword,
      USERNAME: userId,
      SECRET_HASH: secretHash,
    },
    Session: session,
  });

  const { status, cognitoResp, result } = await cognitoConnect(command);

  if (result?.AuthenticationResult) {
    const authresult = decodeAuthResult(result.AuthenticationResult);

    await setSession(authresult);
    await deleteSessAttr(['session', 'userId']);
  }

  return NextResponse.json(cognitoResp, { status });
}
