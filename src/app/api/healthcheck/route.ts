import { NextResponse } from 'next/server';

export async function GET() {
  const response = {
    code: '200.00.000',
    message: 'process ok',
  };

  try {
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ code: '500.00.000', error }, { status: 500 });
  }
}
