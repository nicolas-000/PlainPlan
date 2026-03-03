import { NextResponse } from 'next/server';
import { getWorkers, createWorker } from '../../../lib/store';

export async function GET() {
  return NextResponse.json(getWorkers());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, seniority } = body;
    if (!name || !role || !seniority) {
      return new NextResponse('Missing fields', { status: 400 });
    }
    const w = createWorker({ name, role, seniority });
    return NextResponse.json(w, { status: 201 });
  } catch (err) {
    return new NextResponse('Bad request', { status: 400 });
  }
}
