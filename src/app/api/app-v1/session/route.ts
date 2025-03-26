import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { apiRespObject } from '@/constans';
import type { ApiPromise } from '@/interfaces';
import { createRefreshSess } from '@/libs/redis';

export async function POST(request: NextRequest): ApiPromise {
  const { tenant, sessionId } = await request.json();

  const signinResp = { ...apiRespObject };
  let status = 200;

  try {
    signinResp.sessionId = await createRefreshSess(tenant, sessionId);
  } catch (error) {
    status = 500;
    signinResp.code = `${status}.00.00`;
    signinResp.message = `Internal server ${(error as Error).message}`;
  }

  return NextResponse.json(signinResp, { status });
}
