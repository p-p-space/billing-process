import { NextResponse } from 'next/server';
// Internal app
import { LangFiles } from '@/interfaces';

export async function GET() {
  // Extract locale and tenant from the request body

  const language: LangFiles = {
    default: [],
    tenant: [],
  };

  try {
    return NextResponse.json({ code: '200.000', language }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ code: '500.000', error }, { status: 500 });
  }
}
