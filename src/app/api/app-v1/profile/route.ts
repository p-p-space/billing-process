import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { GetUserCommand, UpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { cognitoConnect } from '@/libs/cognito';
import { getSessAttr, setSessAttr } from '@/libs/redis';
import { ApiPromise, DataServerProps } from '@/interfaces';

function toCamelCase(str: string): string {
  return str.replace(/_(.)/g, (_, char) => char.toUpperCase()).replace(/^custom:/, '');
}

const delAttr = ['sub'];

export async function GET(): ApiPromise {
  const accessToken = (await getSessAttr('accessToken')) as string;

  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  const { status, cognitoResp, result } = await cognitoConnect(command);

  if (result) {
    let userAttr: DataServerProps['userAttr'] = {};

    if (result.UserAttributes) {
      const userAttributes = result.UserAttributes.map((element: { Name: string; Value: unknown }) => {
        const name = toCamelCase(element.Name);
        return { [name]: element.Value };
      });

      userAttr = Object.assign(userAttr, ...userAttributes);
    }

    userAttr.mfaEnable = false;
    userAttr.isIdle = true;
    userAttr.displayName = userAttr.email;
    userAttr.initials = '';

    if (result.UserMFASettingList) {
      userAttr.mfaEnable = true;
      userAttr.mfaMethods = result.UserMFASettingList;
    }

    delAttr.forEach((attr) => delete userAttr[attr]);

    if (userAttr.givenName || userAttr.familyName) {
      const givenName = userAttr.givenName as string;
      const familyName = userAttr.familyName as string;
      userAttr.displayName = `${userAttr.givenName} ${userAttr.familyName}`;
      userAttr.initials = `${givenName[0]}${familyName[0]}`;
    }

    await setSessAttr({ userAttr: JSON.stringify(userAttr) });

    cognitoResp.payload = userAttr;
  }

  return NextResponse.json(cognitoResp, { status });
}

export async function PUT(request: NextRequest): ApiPromise {
  const { userAttr } = await request.json();
  const accessToken = (await getSessAttr('accessToken')) as string;

  const command = new UpdateUserAttributesCommand({
    UserAttributes: userAttr,
    AccessToken: accessToken,
  });

  const { status, cognitoResp } = await cognitoConnect(command);

  return NextResponse.json(cognitoResp, { status });
}
