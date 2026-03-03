import { NextResponse } from 'next/server';
import { getProjects, createProject } from '../../../lib/store';

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, client, startDate, endDate, workerIds } = body;
    if (!name || !client || !startDate) {
      return new NextResponse('Missing fields', { status: 400 });
    }
    const p = createProject({ name, client, startDate, endDate, workerIds });
    return NextResponse.json(p, { status: 201 });
  } catch (err) {
    return new NextResponse('Bad request', { status: 400 });
  }
}
