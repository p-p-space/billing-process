import { type NextRequest } from 'next/server';
// Internal app
import { connectServices } from '@/services';

export async function GET(request: NextRequest) {
  return connectServices(request);
}

export async function POST(request: NextRequest) {
  return connectServices(request);
}

export async function PUT(request: NextRequest) {
  return connectServices(request);
}

export async function PATCH(request: NextRequest) {
  return connectServices(request);
}

export async function DELETE(request: NextRequest) {
  return connectServices(request);
}
