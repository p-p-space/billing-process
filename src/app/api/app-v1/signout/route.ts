import { NextResponse } from 'next/server';
import { GlobalSignOutCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { ApiPromise } from '@/interfaces';
import { apiRespObject } from '@/constans';
import { cognitoConnect } from '@/libs/cognito';
import { deleteSess, getSessAttr } from '@/libs/redis';

export async function GET(): ApiPromise {
  let signOutSess = { ...apiRespObject };
  let status = 200;
  const accessToken = (await getSessAttr('accessToken')) as string;

  if (accessToken) {
    const command = new GlobalSignOutCommand({ AccessToken: accessToken });
    const { cognitoResp, ...resp } = await cognitoConnect(command);
    signOutSess = { ...cognitoResp };
    status = resp.status;
  }

  await deleteSess();

  return NextResponse.json(signOutSess, { status });
}
