import { type NextRequest } from 'next/server';
// Internal app
import { managerCoreServices } from '@/handlers';

export async function GET(request: NextRequest) {
  return managerCoreServices(request);
}

export async function POST(request: NextRequest) {
  return managerCoreServices(request);
}

export async function PUT(request: NextRequest) {
  return managerCoreServices(request);
}

export async function PATCH(request: NextRequest) {
  return managerCoreServices(request);
}

export async function DELETE(request: NextRequest) {
  return managerCoreServices(request);
}
