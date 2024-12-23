import { NextResponse } from 'next/server';
import fs from 'fs';
// Internal app
import type { LangFiles } from '@/interfaces';

const privateKey = process.env.SERV_JWS_PRIVATE_KEY;

export async function GET() {
  // Extract locale and tenant from the request body

  const language: LangFiles = {
    default: [],
    tenant: [],
  };

  try {
    fs.writeFileSync('private_key.pem', `${privateKey}`);

    return NextResponse.json({ code: '200.000', language }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ code: '500.000', error }, { status: 500 });
  }
}
