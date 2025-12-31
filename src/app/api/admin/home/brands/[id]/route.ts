import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Brand from '@/models/home/Brand';

export async function PUT(req: NextRequest, ctx: any) {
  try {
    await connectDB();
    const body = await req.json();
    const maybeParams = ctx && ctx.params ? ctx.params : ctx;
    const resolvedParams = maybeParams && typeof maybeParams.then === 'function' ? await maybeParams : maybeParams;
    const updateData: any = {};
    if (body && typeof body === 'object') {
      if (body.name !== undefined) updateData.name = String(body.name).trim();
      if (body.category !== undefined) updateData.category = String(body.category).trim();
      if (body.description !== undefined) updateData.description = String(body.description).trim();
      if (body.logoUrl !== undefined) updateData.logoUrl = body.logoUrl || '';
      if (body.logoPublicId !== undefined) updateData.logoPublicId = body.logoPublicId || '';
      if (body.tags !== undefined) {
        if (Array.isArray(body.tags)) updateData.tags = body.tags.map((t: any) => String(t).trim()).filter(Boolean);
        else updateData.tags = String(body.tags).split(',').map((t: string) => t.trim()).filter(Boolean);
      }
    }
    if (updateData.category !== undefined && !String(updateData.category).trim()) {
      return NextResponse.json(
        { success: false, error: 'category cannot be empty' },
        { status: 400 }
      );
    }

    const brand = await Brand.findByIdAndUpdate(
      resolvedParams.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!brand) {
      return NextResponse.json(
        { success: false, error: 'Brand not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: brand });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, ctx: any) {
  try {
    await connectDB();
    const maybeParams = ctx && ctx.params ? ctx.params : ctx;
    const resolvedParams = maybeParams && typeof maybeParams.then === 'function' ? await maybeParams : maybeParams;
    const brand = await Brand.findByIdAndDelete(resolvedParams.id);
    
    if (!brand) {
      return NextResponse.json(
        { success: false, error: 'Brand not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}