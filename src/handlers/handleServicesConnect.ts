import { type NextRequest, NextResponse } from 'next/server';
// Internal App
import { appBodyContent } from '@/utils/constans';

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

export async function managerCoreServices(request: NextRequest) {
  const { headers, method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  return NextResponse.json(response, { status });
}
