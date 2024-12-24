import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { connectServices } from '@/services';

/**
 * Handles requests to the services route.
 *
 * @param {NextRequest} request - The HTTP request.
 * @returns {Promise<NextResponse>} - The response from the API or an error response.
 */
async function handler(request: NextRequest): Promise<NextResponse> {
  const { method } = request;

  switch (method) {
    case 'GET':
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      return connectServices(request);
    default:
      return NextResponse.json({ error: `Method ${request.method} Not Allowed` }, { status: 405 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
