import { NextResponse } from 'next/server';

export async function GET() {
  const response = {
    code: '200.00.000',
    message: 'process ok',
  };

  return NextResponse.json(response, { status: 200 });
}
