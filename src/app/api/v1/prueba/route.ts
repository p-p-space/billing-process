import { type NextRequest, NextResponse } from 'next/server';

const response = {
  code: '200.000',
  message: 'process ok',
  data: 'todo bien',
};

export async function GET() {
  return NextResponse.json(response, { status: 200 });
}

export async function POST(req: NextRequest) {
  const dataReq = await req.json();

  return NextResponse.json(dataReq, { status: 200 });
}
