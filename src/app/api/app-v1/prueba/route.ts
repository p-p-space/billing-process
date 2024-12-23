import { type NextRequest, NextResponse } from 'next/server';
// Internal App
import type { ResponseApi } from '@/interfaces';

const status: number = 200;

const response: ResponseApi = {
  code: `${status}.00.001`,
  message: 'Process ok',
  info: '',
  datetime: '2022-05-17T15:44:11.656Z[UTC]',
  payload: undefined,
  error: undefined,
};

export async function GET(request: NextRequest): Promise<NextResponse<ResponseApi>> {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = {
    user: {
      id: 12345,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      apps: ['uno', 'dos'],
    },
  };

  return NextResponse.json(response, { status });
}

export async function POST(request: NextRequest): Promise<NextResponse<ResponseApi>> {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = await request.json();

  return NextResponse.json(response, { status });
}

export async function PUT(request: NextRequest): Promise<NextResponse<ResponseApi>> {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = await request.json();

  return NextResponse.json(response, { status });
}

export async function PATCH(request: NextRequest): Promise<NextResponse<ResponseApi>> {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = await request.json();

  return NextResponse.json(response, { status });
}

export async function DELETE(request: NextRequest): Promise<NextResponse<ResponseApi>> {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.message = `${pathname}${search} --- ${method}`;
  response.payload = undefined;

  return NextResponse.json(response, { status });
}
