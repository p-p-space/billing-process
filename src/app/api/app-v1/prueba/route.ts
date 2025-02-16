import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { readCookie } from '@/utils';
import { tenantCookieName } from '@/constans';
import type { ApiPromise, ResponseApi, Tenant } from '@/interfaces';

const status: number = 200;
const response = {
  code: `${status}.00.000`,
} as ResponseApi;

export async function GET(request: NextRequest): ApiPromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const tenant = (await readCookie(tenantCookieName)) as Tenant;

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = {
    user: {
      id: 12345,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      apps: ['uno', 'dos'],
    },
    tenant,
  };

  return NextResponse.json(response, { status });
}

export async function POST(request: NextRequest): ApiPromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const payload = await request.json();

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = payload;

  return NextResponse.json(response, { status });
}

export async function PUT(request: NextRequest): ApiPromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const payload = await request.json();

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = { user: payload };

  return NextResponse.json(response, { status });
}

export async function PATCH(request: NextRequest): ApiPromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const payload = await request.json();

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = { update: payload };

  return NextResponse.json(response, { status });
}

export async function DELETE(request: NextRequest): ApiPromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const status: number = 500;

  response.message = `${pathname}${search} --- ${method}`;

  if (status !== 200) {
    response.message = `DELETE Error ${pathname}${search} --- ${method}`;
  }

  return NextResponse.json(response, { status });
}
