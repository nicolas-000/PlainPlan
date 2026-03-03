import { NextResponse } from 'next/server';
import { assignWorkerToProject, removeWorkerFromProject } from '../../../../lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, workerId } = body;
    if (!projectId || !workerId) return new NextResponse('Missing fields', { status: 400 });
    try {
      const p = assignWorkerToProject(projectId, workerId);
      return NextResponse.json(p);
    } catch (err: any) {
      return new NextResponse(err?.message || 'Error', { status: 400 });
    }
  } catch (err) {
    return new NextResponse('Bad request', { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { projectId, workerId } = body;
    if (!projectId || !workerId) return new NextResponse('Missing fields', { status: 400 });
    try {
      const p = removeWorkerFromProject(projectId, workerId);
      return NextResponse.json(p);
    } catch (err: any) {
      return new NextResponse(err?.message || 'Error', { status: 400 });
    }
  } catch (err) {
    return new NextResponse('Bad request', { status: 400 });
  }
}
