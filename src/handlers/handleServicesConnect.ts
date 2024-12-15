import { type NextRequest, NextResponse } from 'next/server';

export async function managerCoreServices(request: NextRequest) {
  const { headers } = request;
  let status = 200;
  const response = { code: '', message: '', data: undefined };

  if (headers.get('X-Body-Content') !== null) {
    try {
      response.code = '200.00.00';
      response.message = 'process ok';
      response.data = await request.json();
      return NextResponse.json(response, { status });
    } catch (error) {
      status = 500;
      response.code = '500.00.00';
      response.message = `customerRequest: ${(error as Error).message}`;

      return NextResponse.json(response, { status });
    }
  }
}
