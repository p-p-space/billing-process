import { NextResponse } from 'next/server';
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { currenTenant } from '@/utils';
import { ApiPromise } from '@/interfaces';
import { apiRespObject } from '@/constans';
import { getSessAttr, setSessAttr } from '@/libs/redis';
import { cognitoCredSetts, sessionSetts } from '@/tenants/tenantSettings';
import { cognitoConnect, decodeAuthResult, hashClienSecret } from '@/libs/cognito';

export async function GET(): ApiPromise {
  const tenant = await currenTenant();
  const { sessRefresh } = await sessionSetts(tenant);

  let refresSess = { ...apiRespObject };
  let status = 200;

  const { clientId } = await cognitoCredSetts();
  const logged = await getSessAttr('logged');
  const cognitoUserId = (await getSessAttr('cognitoUserId')) ?? '';
  const refreshToken = (await getSessAttr('refreshToken')) ?? '';
  const { secretHash } = await hashClienSecret(cognitoUserId);
  const cognitoExp = parseInt((await getSessAttr('cognitoExp')) ?? '0');
  const currentTime = Date.now();
  const timeDiff = cognitoExp - currentTime;
  const callRefresCognito = (timeDiff < 5000 || sessRefresh) && logged;

  if (callRefresCognito) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: secretHash,
      },
    });

    const { cognitoResp, result, ...resp } = await cognitoConnect(command);
    refresSess = { ...cognitoResp };
    status = resp.status;

    if (result?.AuthenticationResult) {
      const { accessToken, idToken, cognitoExp } = decodeAuthResult(result.AuthenticationResult);

      const sessAttr = {
        accessToken,
        idToken,
        cognitoExp,
      };

      await setSessAttr(sessAttr);
    }
  }

  return NextResponse.json(refresSess, { status });
}
