import { NextResponse } from 'next/server';

export async function GET() {
  const language = {
    default: [],
    tenant: [],
  };

  try {
    return NextResponse.json({ code: '200.000', language }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ code: '500.000', error }, { status: 500 });
  }
}
