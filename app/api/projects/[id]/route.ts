import { NextResponse } from 'next/server';
import { getProject, updateProject, deleteProject } from '../../../../lib/store';

export async function GET(_req: Request, ctx: any) {
  const params = await ctx.params;
  const { id } = params;
  const p = getProject(id);
  if (!p) return new NextResponse('Not found', { status: 404 });
  return NextResponse.json(p);
}

export async function PUT(req: Request, ctx: any) {
  try {
    const params = await ctx.params;
    const { id } = params;
    const body = await req.json();
    const { name, client, startDate, endDate, workerIds } = body;
    try {
      const updated = updateProject(id, { name, client, startDate, endDate, workerIds });
      return NextResponse.json(updated);
    } catch (err: any) {
      return new NextResponse(err?.message || 'Error', { status: 400 });
    }
  } catch (err) {
    return new NextResponse('Bad request', { status: 400 });
  }
}

export async function DELETE(_req: Request, ctx: any) {
  try {
    const params = await ctx.params;
    const { id } = params;
    deleteProject(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return new NextResponse('Error', { status: 400 });
  }
}
