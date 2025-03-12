import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import type { ApiPromise } from '@/interfaces';
import { connectServices } from '@/libs/axios';
import { createResponseApi } from '@/libs/http';

/**
 * Handles requests to the services route.
 *
 * @param {NextRequest} request - The HTTP request.
 * @returns {ApiPromise} - The response from the API or an error response.
 */
async function handler(request: NextRequest): ApiPromise {
  const { method } = request;

  switch (method) {
    case 'GET':
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      return await connectServices(request);
    default: {
      const noAllow = createResponseApi({ code: '405.00.000', message: `Method ${method} Not Allowed` });
      return NextResponse.json(noAllow, { status: 405 });
    }
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
