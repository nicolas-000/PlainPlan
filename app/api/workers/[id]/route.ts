import { NextResponse } from 'next/server';
import { getWorker, updateWorker, deleteWorker } from '../../../../lib/store';

export async function GET(_req: Request, ctx: any) {
  const params = await ctx.params;
  const { id } = params;
  const w = getWorker(id);
  if (!w) return new NextResponse('Not found', { status: 404 });
  return NextResponse.json(w);
}

export async function PUT(req: Request, ctx: any) {
  try {
    const params = await ctx.params;
    const { id } = params;
    const body = await req.json();
    const { name, role, seniority } = body;
    if (!name || !role || !seniority) return new NextResponse('Missing fields', { status: 400 });
    try {
      const w = updateWorker(id, { name, role, seniority });
      return NextResponse.json(w);
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
    deleteWorker(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return new NextResponse('Error', { status: 400 });
  }
}
