import { NextResponse } from 'next/server';
import { GlobalSignOutCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { cognitoConnect } from '@/libs/cognito';
import { deleteSess, getSessAttr } from '@/libs/redis';
import { apiRespObject } from '@/constans';

export async function GET() {
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
