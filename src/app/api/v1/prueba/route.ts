import { type NextRequest, NextResponse } from 'next/server';

const status = 200;
const response: { code: string; message: string; payload: undefined | object; error: undefined | string | object } = {
  code: '',
  message: '',
  payload: undefined,
  error: undefined,
};
const payload = {
  user: {
    id: 12345,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
  },
};

export async function GET(request: NextRequest) {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.code = `${status}.00.000`;
  response.message = `${pathname}${search} --- ${method}`;
  response.payload = payload;

  return NextResponse.json(response, { status });
}

export async function POST(request: NextRequest) {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.code = `${status}.00.001`;
  response.message = `${pathname}${search} --- ${method}`;
  response.payload = await request.json();

  return NextResponse.json(response, { status });
}

export async function PUT(request: NextRequest) {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.code = `${status}.00.002`;
  response.message = `${pathname}${search} --- ${method}`;
  response.payload = await request.json();

  return NextResponse.json(response, { status });
}

export async function PATCH(request: NextRequest) {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.code = `${status}.00.002`;
  response.message = `${pathname}${search} --- ${method}`;
  response.payload = await request.json();

  return NextResponse.json(response, { status });
}

export async function DELETE(request: NextRequest) {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  response.code = `${status}.00.003`;
  response.message = `${pathname}${search} --- ${method}`;
  response.payload = undefined;

  return NextResponse.json(response, { status });
}
