import { type NextRequest, NextResponse } from 'next/server';
// Internal App
import { createErrorResponseApi, createResponseApi } from '@/libs/axios';
import type { ApiResponsePromise, ParamsProps, ResponseApi } from '@/interfaces';

const status: number = 200;
const response = {
  code: `${status}.00.000`,
} as ResponseApi;

export async function GET(request: NextRequest, { params }: ParamsProps): ApiResponsePromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;
  const { tenant } = await params;

  try {
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

    const respGet = createResponseApi(response);

    return NextResponse.json(respGet, { status });
  } catch (error) {
    const { status, data } = createErrorResponseApi(error as Error);
    return NextResponse.json(data, { status });
  }
}

export async function POST(request: NextRequest): ApiResponsePromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  try {
    response.message = `${pathname}${search} --- ${method}`;
    response.payload = await request.json();

    const respPost = createResponseApi(response);

    return NextResponse.json(respPost, { status });
  } catch (error) {
    const { status, data } = createErrorResponseApi(error as Error);
    return NextResponse.json(data, { status });
  }
}

export async function PUT(request: NextRequest): ApiResponsePromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  try {
    response.message = `${pathname}${search} --- ${method}`;
    response.payload = await request.json();

    const respPut = createResponseApi(response);

    return NextResponse.json(respPut, { status });
  } catch (error) {
    const { status, data } = createErrorResponseApi(error as Error);
    return NextResponse.json(data, { status });
  }
}

export async function PATCH(request: NextRequest): ApiResponsePromise {
  const { method, nextUrl } = request;
  const { pathname, search } = nextUrl;

  try {
    response.message = `${pathname}${search} --- ${method}`;
    response.payload = await request.json();

    const respPatch = createResponseApi(response);

    return NextResponse.json(respPatch, { status });
  } catch (error) {
    const { status, data } = createErrorResponseApi(error as Error);
    return NextResponse.json(data, { status });
  }
}

export async function DELETE(request: NextRequest): ApiResponsePromise {
  try {
    const { method, nextUrl } = request;
    const { pathname, search } = nextUrl;

    response.message = `${pathname}${search} --- ${method}`;

    const respDelete = createResponseApi(response);

    if (respDelete) {
      throw new Error('Error en DELETE');
    }

    return NextResponse.json(respDelete, { status });
  } catch (error) {
    const { status, data } = createErrorResponseApi(error as Error);
    return NextResponse.json(data, { status });
  }
}
